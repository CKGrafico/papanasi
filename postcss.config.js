module.exports = {
  plugins: [
    require('postcss-at-rules-variables'),
    require('postcss-import'),
    require('postcss-calc')({ preserve: false }),
    require('postcss-each'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer'),
    require('postcss-discard-comments')
  ],
  inject: true
};
