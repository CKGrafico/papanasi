import fs from 'fs-extra';
import path from 'path';

export const PLATFORM_OUTPUT_EXTENSIONS = {
  angular: 'ts',
  preact: 'tsx',
  qwik: 'tsx',
  react: 'tsx',
  solid: 'tsx',
  svelte: 'svelte',
  vue: 'vue',
  webcomponents: 'ts'
};

const CLASSNAME_POLICY = {
  react: { allowClassNameAttribute: true, allowClassNameMemberAccess: true },
  preact: { allowClassNameAttribute: true, allowClassNameMemberAccess: true }
};

function findContractViolations({ content, target }) {
  const violations = [];
  const classnamePolicy = CLASSNAME_POLICY[target] || {};

  if (content.includes('~/')) {
    violations.push("Found unresolved '~/' alias.");
  }

  if (
    /(?:from|import)\s*['"][^'"]*\.lite(?:\.[^'"]*)?['"]/g.test(content) ||
    /import\(\s*['"][^'"]*\.lite(?:\.[^'"]*)?['"]\s*\)/g.test(content)
  ) {
    violations.push("Found '.lite' import that should have been removed.");
  }

  if (!classnamePolicy.allowClassNameAttribute && /\bclassName\s*=/g.test(content)) {
    violations.push("Found 'className=' leak for a non-React-like target.");
  }

  if (!classnamePolicy.allowClassNameMemberAccess && /\.className\b/g.test(content)) {
    violations.push("Found '.className' member leak for a non-React-like target.");
  }

  return violations;
}

export function getCompiledOutputPath(sourceFile, target, destination = 'packages') {
  const extension = PLATFORM_OUTPUT_EXTENSIONS[target];

  if (!extension) {
    throw new Error(`Unsupported target '${target}' for contract checks.`);
  }

  const parsedFile = path.parse(sourceFile);
  return path.join(destination, target, parsedFile.dir, `${parsedFile.name.replace('.lite', '')}.${extension}`);
}

export function collectCompileContractErrors({ outFile, target, content }) {
  const errors = [];

  if (!fs.existsSync(outFile)) {
    return [`Generated file is missing: ${outFile}`];
  }

  const currentContent = content ?? fs.readFileSync(outFile, 'utf8');
  const violations = findContractViolations({ content: currentContent, target });

  violations.forEach((violation) => errors.push(`${violation} (${outFile})`));

  return errors;
}

export function assertCompileContracts({ outFile, target, content }) {
  const errors = collectCompileContractErrors({ outFile, target, content });

  if (!errors.length) {
    return;
  }

  throw new Error(`Compile contract failed for ${target}\n- ${errors.join('\n- ')}`);
}
