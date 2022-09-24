import commandLineArgs from 'command-line-args';
import glob from 'glob';
import ora from 'ora';

const DEFAULT_OPTIONS = {
  files: 'src/**/*.lite.tsx',
  dest: 'packages',
  options: {},
  targets: [],
  extensions: []
};

const optionDefinitions = [{ name: 'file', alias: 'f', type: String }];

export function globalCompile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.files = cliConfig.file ? `src/${cliConfig.file}/${cliConfig.file}.lite.tsx` : options.files;

  const spinner = ora('Loading unicorns').start();
  const files = options.file ? [options.file] : glob.sync(options.files);

  files.forEach((file) => {
    spinner.color = 'yellow';
    spinner.text = file;
  });

  setTimeout(() => {
    spinner.stop();
  }, 5000);
}
