const { defineConfig } = require('vite');

module.exports = (entry, name, rollupOptions) => {
  return defineConfig({
    build: {
      lib: {
        entry,
        name: 'Papanasi',
        formats: ['es', 'umd'],
        fileName: (format) => `${name}.${format}.js`
      },
      rollupOptions
    }
  });
};
