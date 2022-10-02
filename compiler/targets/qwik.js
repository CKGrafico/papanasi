const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'qwik',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  await compiler.compile({ ...DEFAULT_OPTIONS });
})();
