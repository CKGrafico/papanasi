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
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);

    const result = data
      // Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/import/, `import { ${pascalName}Props } from './${name}.model';\nimport`)
      // Type defineProps
      .replace(/defineProps\(\[(.|\n)*\]\);/gm, `defineProps<${pascalName}Props>();`)
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
