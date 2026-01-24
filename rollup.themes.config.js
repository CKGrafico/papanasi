import postcss from 'rollup-plugin-postcss';
import commandLineArgs from 'command-line-args';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const optionDefinitions = [
  { name: 'config', alias: 'c', type: String },
  { name: 'theme', alias: 't', type: String }
];

export default () => {
  const cliConfig = commandLineArgs(optionDefinitions);
  const postcssConfig = require(path.resolve(__dirname, './postcss.config.cjs'));

  return [
    {
      input: `./src/styles/themes/${cliConfig.theme}/index.css`,
      output: [
        {
          file: `.themes/${cliConfig.theme}.css`,
          sourcemap: 'inline'
        }
      ],
      plugins: [postcss({ ...postcssConfig, inject: false, extract: `${cliConfig.theme}.css` })]
    }
  ];
};
