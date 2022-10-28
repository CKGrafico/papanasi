const compiler = require('../base.compiler');
const fs = require('fs');

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
    const result = data
      // Import types
      .replace(/import/, `import type { ${pascalName}Props } from './${name}.model';\nimport`)
      // fix props on qwik
      .replace(
        /export const (.*) = component\$\(\((props)\) => \{/g,
        `export const ${pascalName} = component$((props: ${pascalName}Props) => {`
      );
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
