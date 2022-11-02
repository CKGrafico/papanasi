const config = require('../../rollup.config');
const withSolid = require('rollup-preset-solid').default;

module.exports = withSolid(
  config({
    dir: __dirname,
    packageJson: require('./package.json'),
    compilerOptions: {
      jsx: 'preserve',
      jsxImportSource: 'solid-js'
    }
  })
);
