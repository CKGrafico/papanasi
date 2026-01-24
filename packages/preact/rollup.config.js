import config from '../../rollup.config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

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
