const glob = require('glob');
const fs = require('fs');
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
  extension: '',
  customReplace: (outFile, isFirstCompilation) => null
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

  function copyBasicFilesOnFirstCompilation(filepath) {
    if (!isFirstCompilation) {
      return;
    }

    if (!fs.existsSync(`${outPath}/src`)) {
      fs.mkdirSync(`${outPath}/src`);
    }

    if (!fs.existsSync(`${outPath}/${path.parse(filepath).dir}`)) {
      fs.mkdirSync(`${outPath}/${path.parse(filepath).dir}`);
    }

    fs.copyFileSync('src/index.ts', `${outPath}/src/index.ts`);

    const services = glob.sync(`${path.parse(filepath).dir}/*.service.ts`);

    services.forEach((element) =>
      fs.copyFileSync(element, `${outPath}/${path.parse(element).dir}/${path.parse(element).base}`)
    );

    const data = fs.readFileSync('README.md', 'utf8');
    const result = data.replace(
      /\/\{platform\}.+/g,
      `/${options.target + (options.target === 'webcomponent' ? 's' : '')}`
    );

    fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);

    //////// TODO
    const outFile = `${outPath}/${filepath.replace(`/${file.base}`, '')}.${options.extension}`;

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

  function replacePropertiesFromCompiledFiles(outFile) {
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
  }

  for (const file of files) {
    spinner.text = file;

    copyBasicFilesOnFirstCompilation(file);
    const { outFile } = await compileMitosisComponent(file);
    replacePropertiesFromCompiledFiles(outFile);
    options.customReplace(outFile, isFirstCompilation);

    spinner.stop();
  }
}

module.exports = {
  compile
};
