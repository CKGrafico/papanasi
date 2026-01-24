import config from '../../rollup.config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default config({
  dir: './packages/react',
  packageJson,
  babelPresets: ['@babel/preset-react'],
  compilerOptions: {
    jsx: 'react',
    jsxImportSource: null
  }
});
