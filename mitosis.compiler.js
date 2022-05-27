const glob = require('glob');
const fs = require('fs');
const prependFile = require('prepend-file');
const path = require('path');
const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const config = require('./mitosis.config');
const compileCommand = require('@builder.io/mitosis-cli/dist/commands/compile');

function compile(filepath) {
  const file = path.parse(filepath);

  config.targets.forEach(async (target, i) => {
    const outPath = `${config.dest}/${target}`;
    const outFile = `${outPath}/${filepath.replace(`/${file.base}`, '')}.${config.extensions[i]}`;
    const isFirstCompilation = !fs.existsSync(`${outPath}/src`);

    if (isFirstCompilation) {
      fs.mkdirSync(`${outPath}/src`);
      fs.copyFileSync('./src/index.ts', `${outPath}/src/index.js`);
    }

    await compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to: target,
          out: outFile
        },
        array: [filepath]
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: printTools.print
    });

    // Fix css imports
    const data = fs.readFileSync(outFile, 'utf8');
    const result = data.replace(/import \{\} from ("|')\.\/(.+)\.css("|')\;/g, "import '../../../src/$2/$2.css';");
    fs.writeFileSync(outFile, result, 'utf8');

    if (target === 'react') {
      // Add react import
      prependFile.sync(outFile, 'import React from "react"; \n');
    }

    if (target === 'vue' && isFirstCompilation) {
      // Add .vue to index
      const data = fs.readFileSync(`${outPath}/src/index.js`, 'utf8');
      const result = data.replace(/\'\;/g, ".vue';").replace(/\.css\.vue/g, '.css');
      fs.writeFileSync(`${outPath}/src/index.js`, result, 'utf8');
    }

    if (target === 'webcomponent') {
      // Ignore types
      prependFile.sync(outFile, '//@ts-nocheck \n');

      // Make component exportable
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data.replace(/class /, 'export default class ').replace(/customElements\.define.*/g, '');
      fs.writeFileSync(outFile, result, 'utf8');
    }
  });
}

glob(config.files, (er, files) => files.forEach((element) => compile(element)));
