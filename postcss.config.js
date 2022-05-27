module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-each'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer')
  ],
  extract: 'papanasi.css',
  inject: false
};
