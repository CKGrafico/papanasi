const glob = require('glob');
const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');

(async () => {
  function getOutput() {
    return new Promise((resolve) => glob(`./dist/build/*.*`, (er, files) => resolve(files)));
  }

  const outputFiles = await getOutput();
  outputFiles.forEach((element) => {
    let filename = path.parse(element).base;
    filename = filename.includes('index.js') ? packageJson.module : `./dist/${filename}`;

    return fs.copyFileSync(element, filename);
  });
})();
