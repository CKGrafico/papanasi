import config from '../../rollup.config.js';
import packageJson from './package.json' assert { type: 'json' };

export default config({
  dir: './packages/preact',
  packageJson,
  babelPresets: ['@babel/preset-react'],
  babelPlugins: ['@babel/plugin-transform-react-jsx'],
  compilerOptions: {
    jsx: 'react',
    jsxImportSource: null
  }
});
