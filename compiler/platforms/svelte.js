const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'svelte',
  extension: 'svelte',
  state: '',
  styles: 'variables'
};

(async () => {
  function customReplace(props) {
    const { outFile, outPath, isFirstCompilation } = props;

    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .svelte to index
        .replace(/\'\;/g, ".svelte';")
        .replace(/\.css\.svelte/g, '.css')
        .replace(/helpers\.svelte/g, 'helpers')
        .replace(/src\/(.*)\.svelte/g, 'src/$1')
        // Remove broken imports
        .replace(/\.\.\/\.\.\/\.\.\/(src\/)?/g, './')
        .replace(/import.*css\';/g, '');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // Work with children (currently not working as expected)
      .replace(/children/g, '$$$slots')
      // Fix circle svg as component
      .replace(/state\./g, '')
      // Svelte compiler is not adding let to the state values
      .replace(/^  (\w*) = (.*)/gm, '  let $1 = $2')
      // Fix state in svelte
      .replace(/svelte:component\n.*this=\{circle\}/g, 'circle')
      // Remove Onchange
      .replace('import onChange from "on-change";', '')
      // Remove ../../ imports
      .replace(/\.\.\/\.\.\/\.\.\//g, './')
      // Remove css imports
      .replace(/import.*\.css';/g, '');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
