// vite.config.js
const path = require('path');
const config = require('../../vite.config');

const name = 'papanasi-react';
const options = {
  external: ['react', 'react-dom', 'styled-components'],
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }
};

module.exports = config(path.resolve(__dirname, 'src/index.js'), name, options);
