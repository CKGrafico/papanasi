import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      target: 'es2020',
      outDir: './dist',
      lib: {
        entry: './src/index.ts',
        formats: ['es', 'cjs'],

        fileName: (format) => `${format === 'es' ? 'papanasi-qwik.es.js' : 'papanasi-qwik.umd.js'}`
      },
      minify: false,
      rollupOptions: {
        external: ['node-fetch']
      }
    },
    plugins: [qwikVite()]
  };
});
