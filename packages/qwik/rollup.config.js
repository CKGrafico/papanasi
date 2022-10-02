const config = require('../../rollup.config');
const { qwikRollup, SingleEntryStrategy } = require('@builder.io/qwik/optimizer');
const path = require('path');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  dts: false,
  plugins: [
    qwikRollup({
      target: 'client'
    })
  ],
  compilerOptions: {
    jsx: 'react',
    jsxImportSource: null
  },
  output: {
    dir: path.resolve(__dirname, 'dist')
  }
});
