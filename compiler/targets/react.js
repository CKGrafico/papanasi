const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'react',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag'
};

(async () => {
  function customReplace(props) {
    const { outFile } = props;

    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // fix contenteditable
      .replace(/contentEditable\=(.*)/g, 'contentEditable=$1\nsuppressContentEditableWarning={true}');
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
