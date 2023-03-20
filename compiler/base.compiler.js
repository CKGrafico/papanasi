import compileCommand from '@builder.io/mitosis-cli/dist/commands/compile.js';
import commandLineArgs from 'command-line-args';
import fs from 'fs-extra';
import glob from 'glob';
import filesystemTools from 'gluegun/filesystem.js';
import printTools from 'gluegun/print.js';
import stringTools from 'gluegun/strings.js';
import ora from 'ora';
import path from 'path';
import postcss from 'postcss';

const DEFAULT_OPTIONS = {
  elements: 'src/**/*.lite.tsx',
  dest: 'packages',
  options: {},
  target: '',
  extension: '',
  state: '',
  api: '',
  styles: '',
  customReplace: (outFile, isFirstCompilation) => null
};

const optionDefinitions = [
  { name: 'elements', alias: 'e', type: String, multiple: true },
  { name: 'dev', type: Boolean }
];

function pascalName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.elements = cliConfig.elements
    ? cliConfig.elements.map((file) => glob.sync(`src/**/${file}/${file}.lite.tsx`)).flat()
    : options.elements;
  options.isDev = !!cliConfig.dev;

  const spinner = ora('Compiling').start();
  const files = cliConfig.elements ? options.elements : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  function copyBasicFilesOnFirstCompilation(isFirstCompilation) {
    if (!isFirstCompilation) {
      return;
    }

    // Move src to all the package folder
    fs.copySync('src', `${outPath}/src`);

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.{mdx,lite.tsx}`);
    unnecessaryFiles.forEach((element) => fs.removeSync(element));

    // Fix aliases
    const distFiles = glob.sync(`${outPath}/src/**/*.{ts,css}`);
    distFiles.forEach((element) => {
      const data = fs.readFileSync(element, 'utf8');
      const result = data
        // Fix alias
        .replace(/\~\//g, '../../../')
        // Remove .lite
        .replace(/\.lite/g, '');

      fs.writeFileSync(element, result, 'utf8');
    });

    // Create specific README
    const data = fs.readFileSync('README.md', 'utf8');
    const result = data.replace(/\/\[target\].+/g, `/${options.target}`);

    fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');

    let fileExports = '$2';

    // Export only the elements we want
    if (cliConfig.elements) {
      fileExports = options.elements
        .map((fileName) => {
          const file = path.parse(fileName);
          const name = file.name.replace('.lite', '');
          return `export { default as ${pascalName(name)} } from './${file.dir
            .replace(/\\/g, '/')
            .replace('src/', '')}';`;
        })
        .join('\n');
    }

    const indexData = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
    const indexResult = indexData
      // Export only needed components
      .replace(/(\/\/ Init Components)(.+?)(\/\/ End Components)/s, `$1\n${fileExports}\n$3`)
      // Set the current platform
      .replace(/Platform.Default/g, `Platform.${pascalName(options.target)}`);

    fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, 'utf8');
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${file.dir}/${file.name.replace('.lite', '')}.${options.extension}`;

    let to = options.target === 'webcomponents' ? 'webcomponent' : options.target;
    to = to === 'vue' ? 'vue3' : to;

    await compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to,
          out: outFile,
          force: true,
          api: options.api,
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
      // Fix alias
      .replace(/\~\//g, '../../../');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  async function compileCssFileForOutputSrc(outFile) {
    const postcssConfig = (await import('../postcss.config.cjs')).default;

    const name = outFile.replace(/\..*/, '.css');
    const data = fs.readFileSync(name, 'utf8');
    const result = await postcss(postcssConfig.plugins).process(data, { from: name, to: name });
    fs.writeFileSync(name, result.css, () => true);
  }

  for (const fileName of files) {
    const file = path.parse(fileName);
    const isFirstCompilation = !fs.existsSync(`${outPath}/src`) || options.isDev;
    const name = file.name.replace('.lite', '');
    const namePascal = pascalName(name);

    spinner.text = fileName;

    copyBasicFilesOnFirstCompilation(isFirstCompilation, fileName);
    const { outFile } = await compileMitosisComponent(fileName);
    replacePropertiesFromCompiledFiles(outFile);
    options.customReplace({ name, pascalName: namePascal, file, outFile, outPath, isFirstCompilation });
    await compileCssFileForOutputSrc(outFile);

    spinner.stop();
  }
}

export default {
  compile
};
