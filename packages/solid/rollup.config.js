import withSolid from 'rollup-preset-solid';
import config from '../../rollup.config.js';
import packageJson from './package.json' assert { type: 'json' };

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
