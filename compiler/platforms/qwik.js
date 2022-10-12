const compiler = require('../base.compiler');
const fs = require('fs');

const DEFAULT_OPTIONS = {
  target: 'qwik',
  extension: 'tsx',
  state: 'useState',
  styles: 'style-tag',
  typescript: true // TODO
};

(async () => {
  function customReplace(props) {
    const { outFile, file } = props;

    const name = file.name.replace('.lite', '');
    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // fix import css
      .replace(/\.service"\;/g, `.service";\nimport '../../../src/${name}/${name}.css';`);
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
