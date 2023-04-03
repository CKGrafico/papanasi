import fs from 'fs-extra';
import glob from 'glob';
import mainPackageJson from '../package.json' assert { type: 'json' };
const dependencies = mainPackageJson.dependencies;
const packagesJson = glob.sync(`./packages/**/package.json`);

function copyMainDependencies(packageJson) {
  const data = fs.readFileSync(packageJson, 'utf8');
  const rawDependencies = Object.entries(dependencies)
    .map(([key, value]) => `\n    "${key}": "${value}"`)
    .join(',');
  const result = data.replace(/("dependencies": {)(.*)(  },\r?\n?  "peerDependencies)/gs, `$1${rawDependencies}\n$3`);

  fs.writeFileSync(packageJson, result, 'utf8');
}

function copyThemes(packageJson) {
  const data = fs.readFileSync(packageJson, 'utf8');
  const rawDependencies = Object.entries(dependencies)
    .map(([key, value]) => `\n    "${key}": "${value}"`)
    .join(',');
  const result = data.replace(/("dependencies": {)(.*)(  },\r?\n?  "peerDependencies)/gs, `$1${rawDependencies}\n$3`);

  fs.writeFileSync(packageJson, result, 'utf8');
}

packagesJson.forEach((packagesJson) => {
  copyMainDependencies(packagesJson);
  copyThemes(packagesJson);
});
