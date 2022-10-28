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

        fileName: (format) => `${format === 'es' ? 'papanasi.mjs' : 'papanasi.cjs'}`
      },
      minify: false,
      rollupOptions: {
        external: ['node-fetch']
      }
    },
    plugins: [qwikVite()]
  };
});
