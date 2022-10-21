const glob = require('glob');
const fs = require('fs');
const path = require('path');
const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const commandLineArgs = require('command-line-args');
const ora = require('ora');
const compileCommand = require('@builder.io/mitosis-cli/dist/commands/compile');

const toPascalCase = (str) =>
  (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

const DEFAULT_OPTIONS = {
  elements: 'src/**/*.lite.tsx',
  dest: 'packages',
  options: {},
  target: '',
  extension: '',
  state: '',
  styles: '',
  customReplace: (outFile, isFirstCompilation) => null
};

const optionDefinitions = [
  { name: 'elements', alias: 'e', type: String, multiple: true },
  { name: 'dev', type: Boolean }
];

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.elements = cliConfig.elements
    ? cliConfig.elements.map((file) => `src/${file}/${file}.lite.tsx`)
    : options.elements;
  options.isDev = !!cliConfig.dev;

  const spinner = ora('Compiling').start();
  const files = cliConfig.elements ? options.elements : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  function copyBasicFilesOnFirstCompilation(isFirstCompilation) {
    if (!isFirstCompilation) {
      return;
    }

    if (!fs.existsSync(`${outPath}/src`)) {
      fs.mkdirSync(`${outPath}/src`);
    }

    fs.copyFileSync('src/index.ts', `${outPath}/src/index.ts`);

    const fileServices = cliConfig.elements ? `src/{${cliConfig.elements.join(',')},}` : 'src/**';
    const services = glob.sync(`${fileServices}/*.{service,model}.ts`);

    services.forEach((element) => {
      const data = fs.readFileSync(element, 'utf8');
      const result = data
        // Fix alias
        .replace(/\~\//g, '../../../');

      fs.writeFileSync(`${outPath}/src/${path.parse(element).base}`, result, 'utf8');
    });

    const data = fs.readFileSync('README.md', 'utf8');
    const result = data.replace(
      /\/\[target\].+/g,
      `/${options.target + (options.target === 'webcomponent' ? 's' : '')}`
    );

    fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');

    if (!cliConfig.elements) {
      return;
    }

    const fileExports = cliConfig.elements
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

  function replacePropertiesFromCompiledFiles(outFile, file) {
    const name = file.name.replace('.lite', '');
    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // Fix alias
      .replace(/\~\//g, '../../../')
      // Meanwhile mitosis don't support import external types...
      .replace(
        'import',
        `import { Dynamic, BaseProps, BaseState, CSS, Variant, Intent, BreakpointProps } from '../../../models';\nimport { ${toPascalCase(
          name
        )}Props, ${toPascalCase(name)}State } from './${name}.model';\nimport`
      )
      // Fix css import
      .replace(/import ("|')\.\/(.+)\.css("|')\;/g, "import '../../../src/$2/$2.css';");

    fs.writeFileSync(outFile, result, 'utf8');
  }

  for (const fileName of files) {
    const file = path.parse(fileName);
    const isFirstCompilation = !fs.existsSync(`${outPath}/src`) || options.isDev;

    spinner.text = fileName;

    copyBasicFilesOnFirstCompilation(isFirstCompilation, fileName);
    const { outFile } = await compileMitosisComponent(fileName);
    replacePropertiesFromCompiledFiles(outFile, file);
    options.customReplace({ file, outFile, outPath, isFirstCompilation });

    spinner.stop();
  }
}

module.exports = {
  compile
};
