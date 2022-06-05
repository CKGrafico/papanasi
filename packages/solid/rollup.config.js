const config = require('../../rollup.config');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  compilerOptions: {
    jsxImportSource: 'solid-js',
    jsx: 'preserve'
  }
});
