import fs from 'fs';
import compiler from '../base.compiler.js';

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
    const result = data
      // Import types
      .replace(/import/, `import type { ${pascalName}Props } from './${name}.model';\nimport`)
      // fix props on qwik
      .replace(/\(props\) ?\{/g, `(props: ${pascalName}Props) {`)
      // fix contenteditable
      .replace(/contentEditable\=(.*)/g, 'contentEditable=$1\nsuppressContentEditableWarning={true}');
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
