const glob = require('glob');
const fs = require('fs');
const prependFile = require('prepend-file');
const path = require('path');
const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const commandLineArgs = require('command-line-args');
const ora = require('ora');
const compileCommand = require('@builder.io/mitosis-cli/dist/commands/compile');

const DEFAULT_OPTIONS = {
  files: 'src/**/*.lite.tsx',
  dest: 'packages',
  options: {},
  target: '',
  extension: ''
};

const optionDefinitions = [{ name: 'file', alias: 'f', type: String }];

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.files = cliConfig.file ? [`src/${cliConfig.file}/${cliConfig.file}.lite.tsx`] : options.files;

  const spinner = ora('Loading unicorns').start();
  const files = cliConfig.file ? options.files : glob.sync(options.files);
  const outPath = `${options.dest}/${options.target}`;
  const isFirstCompilation = !fs.existsSync(`${outPath}/src`);

  async function aaaaa(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${filepath.replace(`/${file.base}`, '')}.${options.extension}`;

    ///////////////

    if (isFirstCompilation) {
      // Copy basic files
      fs.mkdirSync(`${outPath}/src`);
      fs.copyFileSync('./src/index.ts', `${outPath}/src/index.ts`);
      fs.copyFileSync('./README.md', `${outPath}/README.md`);

      const services = glob.sync('./src/**/*.service.ts', (er, files) => resolve(files));
      services.forEach((element) => fs.copyFileSync(element, `${outPath}/src/${path.parse(element).base}`));
    }

    ///////////////
    await compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to: options.target,
          out: outFile,
          force: true,
          state: 'useState',
          styles: 'styled-components' // Todo adaptar por lenguaje
        },
        array: [filepath]
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: { ...printTools.print, info: () => null }
    });

    return {
      outFile
    };
  }

  function bbbbb(outFile) {
    // Fix css imports
    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // Meanwhile mitosis don't support import external types...
      .replace(
        'import',
        "import { Dynamic, SharedProps, Variant, Intent, BreakpointProps } from '../../../models';\nimport"
      )
      // Fix css import
      .replace(/import ("|')\.\/(.+)\.css("|')\;/g, "import '../../../src/$2/$2.css';");

    fs.writeFileSync(outFile, result, 'utf8');

    ////////////
    if (isFirstCompilation) {
      // Move Readme
      const data = fs.readFileSync('./README.md', 'utf8');
      const result = data.replace(/\/\{platform\}.+/g, `/${target + (target === 'webcomponent' ? 's' : '')}`);

      fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');
    }
    ////////////
  }

  function cccccc(outFile) {
    if (options.target === 'vue' && isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/\'\;/g, ".vue';")
        .replace(/\.css\.vue/g, '.css')
        .replace(/helpers\.vue/g, 'helpers')
        .replace(/src\/(.*)\.vue/g, 'src/$1');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (options.target === 'vue') {
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Enable children
        .replace(/this\.children/, 'this.$slots.default()');

      fs.writeFileSync(outFile, result, 'utf8');
    }
  }

  for (const file of files) {
    spinner.text = file;
    const { outFile } = await aaaaa(file);
    bbbbb(outFile);
    cccccc(outFile);

    spinner.stop();
  }
}

module.exports = {
  compile
};
