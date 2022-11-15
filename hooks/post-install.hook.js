const fs = require('fs-extra');
const glob = require('glob');
const mainPackageJson = require('../package.json');
const dependencies = mainPackageJson.dependencies;
const packagesJson = glob.sync(`./packages/**/package.json`);

function copyMainPackageJsonDependencies(packageJson) {
  const data = fs.readFileSync(packageJson, 'utf8');
  const rawDependencies = Object.entries(dependencies)
    .map(([key, value]) => `\n    "${key}": "${value}"`)
    .join(',');
  // const result = data.replace(/"dependencies": {.*/gms, `aaaaaaaaaaa`);
  //const multilineCommentsRE = /  /\*[^*]*\*+(?:[^/*] [^*]*\*+)*\//gm;;

  // fs.writeFileSync(packageJson, result, 'utf8');
}

packagesJson.forEach(copyMainPackageJsonDependencies);
