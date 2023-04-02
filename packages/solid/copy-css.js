import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';

const cssFiles = glob.sync(`./src/**/*.css`);
cssFiles.forEach((fileName) => {
  const file = path.parse(fileName);

  fs.copySync(fileName, `./dist/index${file.dir.replace('src', '')}/${file.base}`);
});

const themesFiles = glob.sync(`../../.themes/**.css`);
themesFiles.forEach((fileName) => {
  const file = path.parse(fileName);

  fs.copySync(fileName, `./dist/themes/${file.base}`);
});
