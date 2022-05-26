const config = require('../../rollup.config');
const vue = require('rollup-plugin-vue');

module.exports = config(__dirname, require('./package.json'), [vue()], ['vue']);
