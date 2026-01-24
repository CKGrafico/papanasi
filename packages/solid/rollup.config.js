import withSolid from 'rollup-preset-solid';
import config from '../../rollup.config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default withSolid(
  await config({
    dir: './packages/solid',
    packageJson,
    compilerOptions: {
      jsx: 'preserve',
      jsxImportSource: 'solid-js'
    }
  })
);
