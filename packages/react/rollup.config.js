const config = require('../../rollup.config');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  presets: ['@babel/preset-react'],
  compilerOptions: {
    jsx: 'react'
  }
});
