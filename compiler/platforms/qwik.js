import fs from 'fs';
import compiler from '../base.compiler.js';

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
      // .replace(/useClientEffect/g, 'useMount')
      // Make all useTask async just in case
      .replace(/useTask\$\(\(/g, 'useTask$(async (')
      // Make all useMount to useTask async just in case
      .replace(/useMount\$\(\(/g, 'useTask$(async (')
      // Make all useWatch async just in case
      .replace(/useWatch\$\(\(/g, 'useWatch$(async (')
      // Then import useTask$,
      .replace(/useMount\$,/g, 'useTask$,')
      // Replace classname for class
      .replace(/\.className/g, '.class')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'await getData();')
      // Signal needs to be typed
      .replace(/useSignal\(\)/g, 'useSignal<any>()')
      .replace(/state.codeService = service;/g, 'state.codeService = noSerialize(service);')
      .replace(/} from "@builder.io\/qwik";/g, ', noSerialize} from "@builder.io/qwik";')
      .replace(/(import[\s\S]*,)([\s]*, noSerialize)/g, '$1 noSerialize');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
