import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import adapter from '@sveltejs/adapter-auto';

const config = {
  kit: {
    adapter: adapter()
  },
  package: {
    source: 'src',
    dir: 'dist'
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['color-hash', 'copy-to-clipboard'])]
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  commonjsOptions: {
    transformMixedEsModules: true
  }
};

export default config;
