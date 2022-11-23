const path = require('path');
const postcss = require('rollup-plugin-postcss');
const postcssConfig = require('./postcss.config.js');

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'config', alias: 'c', type: String },
  { name: 'theme', alias: 't', type: String }
];

module.exports = () => {
  const cliConfig = commandLineArgs(optionDefinitions);

  return [
    {
      input: `./src/styles/themes/${cliConfig.theme}/index.css`,
      output: [
        {
          file: `.themes/${cliConfig.theme}.css`,
          sourcemap: 'inline'
        }
      ],
      plugins: [postcss({ ...postcssConfig, inject: false, extract: 'papanasi.css' })]
    }
  ];
};
