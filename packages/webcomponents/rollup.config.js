import config from '../../rollup.config.js';
import packageJson from './package.json' assert { type: 'json' };

export default config({
  dir: './packages/webcomponents',
  packageJson,
  dts: false
});
