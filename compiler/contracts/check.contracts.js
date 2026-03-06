import commandLineArgs from 'command-line-args';
import glob from 'glob';
import { assertCompileContracts, getCompiledOutputPath, PLATFORM_OUTPUT_EXTENSIONS } from './rules.js';

const optionDefinitions = [
  { name: 'platforms', alias: 'p', type: String, multiple: true },
  { name: 'elements', alias: 'e', type: String, multiple: true }
];

function getSourceFiles(elements) {
  if (!elements?.length) {
    return glob.sync('src/**/*.lite.tsx');
  }

  return elements.map((file) => glob.sync(`src/**/${file}/${file}.lite.tsx`)).flat();
}

(async () => {
  const cliConfig = commandLineArgs(optionDefinitions);
  const platforms = cliConfig.platforms?.length ? cliConfig.platforms : Object.keys(PLATFORM_OUTPUT_EXTENSIONS);
  const sourceFiles = getSourceFiles(cliConfig.elements);
  const errors = [];

  platforms.forEach((platform) => {
    sourceFiles.forEach((sourceFile) => {
      const outFile = getCompiledOutputPath(sourceFile, platform);

      try {
        assertCompileContracts({ outFile, target: platform });
      } catch (error) {
        errors.push(error.message);
      }
    });
  });

  if (errors.length) {
    console.error('Compile contract checks failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(
    `Compile contracts passed for ${platforms.join(', ')} over ${sourceFiles.length} component${sourceFiles.length === 1 ? '' : 's'}.`
  );
})();
