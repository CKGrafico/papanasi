import fs from 'fs';
import compiler from '../base.compiler.js';
import { ensureImport } from '../transforms/imports.js';
import { applyConditionalReplacements } from '../transforms/text.js';

const DEFAULT_OPTIONS = {
  target: 'react',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  function customReplace(props) {
    const { outFile, name, pascalName } = props;

    const data = fs.readFileSync(outFile, 'utf8');
    const withTypeImport = ensureImport(data, `import type { ${pascalName}Props } from './${name}.model';`);
    const result = applyConditionalReplacements(withTypeImport, [
      {
        pattern: /\(props\) ?\{/g,
        replacement: `(props: ${pascalName}Props) {`
      },
      {
        pattern: /contentEditable\=(.*)/g,
        replacement: 'contentEditable=$1\nsuppressContentEditableWarning={true}'
      }
    ]);

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
