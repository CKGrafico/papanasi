import config from '../../rollup.config.js';
import packageJson from './package.json' assert { type: 'json' };

export default config({
  dir: './packages/react',
  packageJson,
  babelPresets: ['@babel/preset-react'],
  compilerOptions: {
    jsx: 'react',
    jsxImportSource: null
  }
});
