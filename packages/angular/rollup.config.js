import config from '../../rollup.config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default config({
  dir: './packages/angular',
  packageJson,
  cancelBrowserListForTypescript: true,
  dts: false
});
