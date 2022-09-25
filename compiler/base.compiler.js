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

  function copyBasicFilesOnFirstCompilation(isFirstCompilation, filepath) {
    if (!isFirstCompilation) {
      return;
    }

    if (!fs.existsSync(`${outPath}/src`)) {
      fs.mkdirSync(`${outPath}/src`);
    }

    fs.copyFileSync('src/index.ts', `${outPath}/src/index.ts`);

    const services = glob.sync(`${path.parse(filepath).dir}/*.service.ts`);

    services.forEach((element) => fs.copyFileSync(element, `${outPath}/src/${path.parse(element).base}`));

    const data = fs.readFileSync('README.md', 'utf8');
    const result = data.replace(
      /\/\{platform\}.+/g,
      `/${options.target + (options.target === 'webcomponent' ? 's' : '')}`
    );

    fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');

    if (!cliConfig.files) {
      return;
    }

    const fileExports = cliConfig.files
      .map((name) => {
        return `export { default as ${name.charAt(0).toUpperCase() + name.slice(1)} } from './${name}';`;
      })
      .join('\n');

    const indexData = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
    const indexResult = indexData.replace(
      /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
      `$1\n${fileExports}\n$3`
    );
    fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, 'utf8');
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/src/${file.name.replace('.lite', '')}.${options.extension}`;

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
    const isFirstCompilation = !fs.existsSync(`${outPath}/src`);

    spinner.text = fileName;

    copyBasicFilesOnFirstCompilation(isFirstCompilation, fileName);
    const { outFile } = await compileMitosisComponent(fileName);
    replacePropertiesFromCompiledFiles(outFile);
    options.customReplace({ file, outFile, outPath, isFirstCompilation });

    spinner.stop();
  }
}

module.exports = {
  compile
};
