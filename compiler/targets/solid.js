const compiler = require('../base.compiler');

const DEFAULT_OPTIONS = {
  target: 'solid',
  extension: 'tsx',
  state: 'signals',
  styles: 'styled-components'
};

(async () => {
  await compiler.compile({ ...DEFAULT_OPTIONS });
})();
