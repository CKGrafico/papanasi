import postcss from 'rollup-plugin-postcss';

import commandLineArgs from 'command-line-args';

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
