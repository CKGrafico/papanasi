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
  state: 'signal',
  styles: '',
  customReplace: (outFile, isFirstCompilation) => null
};

const optionDefinitions = [{ name: 'files', alias: 'f', type: String, multiple: true }];

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.files = cliConfig.files ? cliConfig.files.map((file) => `src/${file}/${file}.lite.tsx`) : options.files;

  const spinner = ora('Compiling').start();
  const files = cliConfig.files ? options.files : glob.sync(options.files);
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
    const outFile = `${outPath}/${file.dir}/${file.name.replace('.lite', '')}.${options.extension}`;

    await compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to: options.target,
          out: outFile,
          force: true,
          state: options.state,
          styles: options.styles
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

  for (const fileName of files) {
    const file = path.parse(fileName);
    spinner.text = fileName;

    copyBasicFilesOnFirstCompilation(fileName);
    const { outFile } = await compileMitosisComponent(fileName);
    replacePropertiesFromCompiledFiles(outFile);
    options.customReplace({ file, outFile, outPath, isFirstCompilation });

    spinner.stop();
  }
}

module.exports = {
  compile
};
