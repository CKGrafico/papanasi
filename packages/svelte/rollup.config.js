const config = require('../../rollup.config');
const svelte = require('rollup-plugin-svelte');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  plugins: [
    svelte({
      compilerOptions: {
        generate: 'ssr',
        hydratable: true
      }
    })
  ],
  dts: false,
  compilerOptions: {
    types: ['node', 'svelte'],
    jsxImportSource: null
  }
});
