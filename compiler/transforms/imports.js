import { escapeRegExp } from './text.js';

function normalizeImportStatement(statement) {
  return statement.trim().replace(/;?$/, ';');
}

export function ensureImport(source, statement) {
  const normalizedStatement = normalizeImportStatement(statement);
  const hasImport = new RegExp(`^\\s*${escapeRegExp(normalizedStatement)}\\s*$`, 'm').test(source);

  if (hasImport) {
    return source;
  }

  const firstImportMatch = source.match(/^\s*import .*$/m);

  if (!firstImportMatch || firstImportMatch.index === undefined) {
    return `${normalizedStatement}\n${source}`;
  }

  return `${source.slice(0, firstImportMatch.index)}${normalizedStatement}\n${source.slice(firstImportMatch.index)}`;
}

export function ensureNamedImport(source, { moduleName, importName }) {
  const importExpression = new RegExp(
    `^\\s*import\\s*\\{([^}]+)\\}\\s*from\\s*['"]${escapeRegExp(moduleName)}['"];?\\s*$`,
    'm'
  );

  if (!importExpression.test(source)) {
    return ensureImport(source, `import { ${importName} } from '${moduleName}';`);
  }

  return source.replace(importExpression, (line, imports) => {
    const importTokens = imports
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (importTokens.includes(importName)) {
      return line;
    }

    return line.replace(`{${imports}}`, `{ ${[...importTokens, importName].join(', ')} }`);
  });
}
