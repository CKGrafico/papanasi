const fs = require('fs-extra');
const glob = require('glob');
const mainPackageJson = require('../package.json');
const dependencies = mainPackageJson.dependencies;
const packagesJson = glob.sync(`./packages/**/package.json`);

function copyMainPackageJsonDependencies(packageJson) {
  const rawData = fs.readFileSync(packageJson, 'utf8');
  const data = JSON.parse(rawData);
  data.dependencies = dependencies;

  fs.writeFileSync(packageJson, JSON.stringify(data), 'utf8');
}

packagesJson.forEach(copyMainPackageJsonDependencies);
