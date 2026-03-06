import fs from 'fs';
import compiler from '../base.compiler.js';
import { ensureImport, ensureNamedImport } from '../transforms/imports.js';
import { replaceClassName } from '../transforms/replacements.js';
import { applyConditionalReplacements } from '../transforms/text.js';

const DEFAULT_OPTIONS = {
  target: 'qwik',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  function customReplace(props) {
    const { outFile, file } = props;

    const name = file.name.replace('.lite', '');
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);

    const data = fs.readFileSync(outFile, 'utf8');
    const withClassNameFixed = replaceClassName(data);
    const withTypeImport = ensureImport(withClassNameFixed, `import type { ${pascalName}Props } from './${name}.model';`);
    const withCssImport = ensureImport(withTypeImport, `import './${name}.css';`);
    const withNoSerializeImport = ensureNamedImport(withCssImport, {
      moduleName: '@builder.io/qwik',
      importName: 'noSerialize'
    });
    const result = applyConditionalReplacements(withNoSerializeImport, [
      {
        // fix props on qwik
        pattern: /export const (.*) = component\$\(\((props)\) => \{/g,
        replacement: `export const ${pascalName} = component$((props: ${pascalName}Props) => {`
      },
      {
        // Make all useTask async just in case
        pattern: /useTask\$\(\(/g,
        replacement: 'useTask$(async ('
      },
      {
        // Make all useMount to useTask async just in case
        pattern: /useMount\$\(\(/g,
        replacement: 'useTask$(async ('
      },
      {
        // Make all useWatch async just in case
        pattern: /useWatch\$\(\(/g,
        replacement: 'useWatch$(async ('
      },
      {
        // Then import useTask$,
        pattern: /useMount\$,/g,
        replacement: 'useTask$,'
      },
      {
        // Signal needs to be typed
        pattern: /useSignal\(\)/g,
        replacement: 'useSignal<any>()'
      },
      {
        pattern: /state.codeService = service;/g,
        replacement: 'state.codeService = noSerialize(service);'
      }
    ]);

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
