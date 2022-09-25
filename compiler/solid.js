const compiler = require('./shared/shared.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'solid',
  extension: 'tsx',
  state: 'useState',
  styles: 'styled-components'
};

(async () => {
  await compiler.compile({ ...DEFAULT_OPTIONS });
})();
