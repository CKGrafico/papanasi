module.exports = {
  plugins: [
    require('postcss-at-rules-variables'),
    require('postcss-import'),
    require('postcss-each'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer'),
    require('postcss-discard-comments')
  ],
  extract: 'papanasi.css',
  inject: false
};
