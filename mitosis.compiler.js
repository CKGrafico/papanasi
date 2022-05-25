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

    fs.mkdirSync(`${outPath}/src`);
    fs.copyFileSync('./src/index.ts', `${outPath}/src/index.js`);

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

    if (target === 'react') {
      prependFile.sync(outFile, 'import React from "react"; \n');
    }
  });
}

glob(config.files, (er, files) => files.forEach((element) => compile(element)));
