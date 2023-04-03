import fs from 'fs-extra';
import glob from 'glob';
import lernaJson from '../lerna.json' assert { type: 'json' };
const version = lernaJson.version;
const filesToReplace = glob.sync(`./packages/**/{,!node_modules)/**/}*.{js,ts,map,cjs,mjs}`);

function setCorrrectVersion(file) {
  if (file.includes('node_modules')) {
    return;
  }

  const data = fs.readFileSync(file, 'utf8');
  const result = data.replace(/setVersion\((\'|\")(.*)(\'|\")\);/g, `setVersion($3${version}$3);`);

  fs.writeFileSync(file, result, 'utf8');
}

filesToReplace.forEach((file) => {
  setCorrrectVersion(file);
});
