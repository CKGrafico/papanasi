const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue',
  state: '',
  styles: ''
};

(async () => {
  function customReplace(props) {
    const { outFile, outPath, isFirstCompilation } = props;

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
    const result = data
      // Enable children
      .replace(/this\.children/, 'this.$slots.default()')
      // Add vue dependencies
      .replace('import', "import { ref } from 'vue';\nimport")
      // Replace vue html .values for refs
      .replace(/\.value \}\}/g, '}}')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'getData.bind(this)();');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
