import vue from 'rollup-plugin-vue';
import config from '../../rollup.config.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default config({
  dir: './packages/vue',
  packageJson,
  postPlugins: [vue({ template: { optimizeSSR: true } })],
  external: ['vue'],
  dts: false
});
