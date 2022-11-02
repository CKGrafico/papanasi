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
        .replace(/(export)(.*)\/(.+)';/g, "$1$2/$3/$3.svelte';")
        .replace(/(extensions)\/(.*)\.svelte/g, '$1/$2')
        .replace(/\/helpers\.svelte/g, '');

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
      .replace('import onChange from "on-change";', '');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
