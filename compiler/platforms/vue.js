import fs from 'fs-extra';
import glob from 'glob';
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
    const { name, pascalName, outFile, file, outPath, isFirstCompilation } = props;

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

    const allTheNeededTypes = glob
      .sync([`src/models/**/*.model.ts`, `src/**/${name}.model.ts`])
      .reverse()
      .map((src) => fs.readFileSync(src, 'utf8'))
      .join('\n')
      // Remove type imports, should be injected
      .replace(/import type .*/g, '');

    const result = data
      // Inject needed types to this file as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/(<script setup)/g, `<script lang="ts">${allTheNeededTypes}</script>\n$1`)
      // Type defineProps and Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/(const props = defineProps)\(\[(.|\n)*\]\);/gm, `$1<${pascalName}Props>();`)
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

    // Once replaces are done, vue needs to merge all the Props interfaces in one
    const a = result.match(/export interface .*Props ?(\n? ? ?)?extends([\s\S]*?){/gm);
    const b =
      a &&
      a[0] &&
      a[0]
        .replace(/export interface.*extends ?/, '')
        .replace(/ ?{ ?/, '')
        .replace(/, /, ',')
        .split(',');
    // TODO continue injection
    console.log(name, b);

    if (name === 'column') {
      console.log(name);
    }
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
