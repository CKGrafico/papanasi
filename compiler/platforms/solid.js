const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'solid',
  extension: 'tsx',
  state: 'useState',
  styles: 'styled-components'
};

(async () => {
  function customReplace(props) {
    const { outFile } = props;

    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // fix keys
      .replace(/ key\=/g, ' data-key=');
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
