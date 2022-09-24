const compiler = require('./shared/shared.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue'
};

(async () => {
  function customReplace(outFile, isFirstCompilation) {
    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/\'\;/g, ".vue';")
        .replace(/\.css\.vue/g, '.css')
        .replace(/helpers\.vue/g, 'helpers')
        .replace(/src\/(.*)\.vue/g, 'src/$1');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // Enable children
      .replace(/this\.children/, 'this.$slots.default()');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
