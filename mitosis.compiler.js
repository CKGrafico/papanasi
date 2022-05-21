const glob = require('glob');
const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const config = require('./mitosis.config');
const compileCommand = require('@builder.io/mitosis-cli/dist/commands/compile');

function compile(filename) {
  config.targets.forEach((target, i) => {
    compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to: target,
          out: `${config.dest}/${target}/${filename.replace(/\..*/, '')}.${config.extensions[i]}`
        },
        array: [filename]
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: printTools.print
    });
  });
}

glob(config.files, (er, files) => files.forEach((element) => compile(element)));
