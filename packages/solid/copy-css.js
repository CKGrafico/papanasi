const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const cssFiles = glob.sync(`./src/**/*.css`);
cssFiles.forEach((fileName) => {
  const file = path.parse(fileName);

  fs.copySync(fileName, `./dist/index/${file.dir.replace('./src/', '')}/${file.base}`);
});

const themesFiles = glob.sync(`../../.themes/**.css`);
themesFiles.forEach((fileName) => {
  const file = path.parse(fileName);

  fs.copySync(fileName, `./dist/${file.base}`);
});
