const compiler = require('./shared/shared.compiler');

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue'
};

function compile(options) {
  function customReplace(outFile, isFirstCompilation) {
    if (options.target === 'vue' && isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/\'\;/g, ".vue';")
        .replace(/\.css\.vue/g, '.css')
        .replace(/helpers\.vue/g, 'helpers')
        .replace(/src\/(.*)\.vue/g, 'src/$1');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (options.target === 'vue') {
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Enable children
        .replace(/this\.children/, 'this.$slots.default()');

      fs.writeFileSync(outFile, result, 'utf8');
    }
  }

  compiler.compile({ ...options, customReplace });
}

compile(DEFAULT_OPTIONS);
