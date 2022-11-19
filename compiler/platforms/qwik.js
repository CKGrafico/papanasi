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
      .replace(/import/, `import type { ${pascalName}Props } from './${name}.model';\nimport './${name}.css';\nimport`)
      // fix props on qwik
      .replace(
        /export const (.*) = component\$\(\((props)\) => \{/g,
        `export const ${pascalName} = component$((props: ${pascalName}Props) => {`
      )
      // Fix https://github.com/BuilderIO/mitosis/pull/855
      .replace(/useClientEffect/g, 'useMount')
      // Make all usemounts async just in case
      .replace(/useMount\$\(\(\) => {/g, 'useMount$(async () => {')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'await getData();');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
