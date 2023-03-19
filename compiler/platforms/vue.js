import fs from 'fs';
import compiler from '../base.compiler.js';

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue',
  api: 'composition',
  state: '',
  styles: ''
};

(async () => {
  function customReplace(props) {
    const { outFile, file, outPath, isFirstCompilation } = props;

    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/(export)(.*)\/(.+)';/g, "$1$2/$3/$3.vue';")
        .replace(/(extensions)\/(.*)\.vue/g, '$1/$2')
        .replace(/\/helpers\.vue/g, '');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    const data = fs.readFileSync(outFile, 'utf8');
    const name = file.name.replace('.lite', '');

    let typesFileData = fs.readFileSync(`${outFile.replace(`${name}.vue`, '')}/${name}.model.ts`, 'utf8');

    let propTypes = typesFileData
      // Remove import type
      .replace(/import type/g, 'import')
      // Remove everything except the type
      .match(/export type .*Props = ([\s\S]*?)BaseProps;/gm);
    propTypes = propTypes && propTypes[0].replace(/export type .*Props = /, '').slice(0, -1);

    let propTypesDependencies = typesFileData.match(/import ([\s\S]*?)export/gm);
    propTypesDependencies = propTypesDependencies && propTypesDependencies[0].replace(/export/g, '');

    const othertypes = typesFileData
      .match(/type (.*) =/g)
      .map((x) => x.replace(/type (.*) =/, '$1'))
      .filter((x) => !x.includes('Props'))
      .join(',');

    const result = data
      // Import proptypes dependencies
      .replace(/import/, `${propTypesDependencies}\n import {${othertypes}} from './${name}.model'; \nimport`)
      // Type defineProps and Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/defineProps\(\[(.|\n)*\]\);/gm, `defineProps<${propTypes}>();`)
      // Enable children
      .replace(/this\.children/, 'this.$slots.default()')
      // Add vue dependencies
      // .replace('import', "import { ref } from 'vue';\nimport")
      // Replace vue html .values for refs
      .replace(/\.value \}\}/g, '}}')
      // Enable Typescript
      .replace(/script setup/g, 'script setup lang="ts"')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'getData.bind(this)();');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
