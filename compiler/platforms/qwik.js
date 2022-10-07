const compiler = require('../base.compiler');
const prependFile = require('prepend-file');

const DEFAULT_OPTIONS = {
  target: 'qwik',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag',
  typescript: true // TODO
};

(async () => {
  function customReplace(props) {
    const { outFile } = props;

    // prependFile.sync(outFile, '//@ts-nocheck \n');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
