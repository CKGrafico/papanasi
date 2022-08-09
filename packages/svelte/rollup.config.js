const config = require('../../rollup.config');
const svelte = require('rollup-plugin-svelte');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  plugins: [svelte()],
  dts: false,
  compilerOptions: {
    types: ['node', 'svelte'],
    jsxImportSource: null
  }
});
