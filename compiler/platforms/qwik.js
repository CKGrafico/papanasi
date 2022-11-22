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
      // Make all usewatchs async just in case
      .replace(/useWatch\$\(\(\{ track \}\) => {/g, 'useWatch$(async ({ track }) => {')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'await getData();')
      // Looks like current is not working on qwik https://github.com/BuilderIO/mitosis/pull/596/files#diff-c2c57a93631396da54ba47a5b70cd81470ce51c3a6485c889e20960ab7f2915c
      .replace(/Ref(,|\))/g, 'Ref.current$1')
      // Temporal fixes
      .replace(/.current, (x)/g, ',$1')
      .replace(/useRef.current/g, 'useRef')
      .replace(/const code = codeRef;/g, 'const code = track(() => codeRef.current);')
      .replace(/state.codeService = service;/g, 'state.codeService = noSerialize(service);')
      .replace(/} from "@builder.io\/qwik";/g, 'noSerialize} from "@builder.io/qwik";');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
