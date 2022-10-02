const compiler = require('../base.compiler');

const DEFAULT_OPTIONS = {
  target: 'qwik',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  await compiler.compile({ ...DEFAULT_OPTIONS });
})();
