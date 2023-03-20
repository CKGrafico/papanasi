import vue from 'rollup-plugin-vue';
import config from '../../rollup.config.js';
import packageJson from './package.json' assert { type: 'json' };

export default config({
  dir: './packages/vue',
  packageJson,
  postPlugins: [vue()],
  external: ['vue'],
  dts: false
});
