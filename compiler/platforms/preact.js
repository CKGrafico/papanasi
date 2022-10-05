const compiler = require('../base.compiler');

const DEFAULT_OPTIONS = {
  target: 'preact',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  await compiler.compile({ ...DEFAULT_OPTIONS });
})();
