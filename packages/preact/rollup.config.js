const config = require('../../rollup.config');

module.exports = config({
  dir: __dirname,
  packageJson: require('./package.json'),
  babelPresets: ['@babel/preset-react'],
  babelPlugins: ['@babel/plugin-transform-react-jsx'],
  compilerOptions: {
    jsx: 'react',
    jsxImportSource: null
  }
});
