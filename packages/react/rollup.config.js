// vite.config.js
const path = require('path');
const config = require('../../rollup.config');

module.exports = config(__dirname, require('./package.json'));
