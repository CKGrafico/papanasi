module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-each'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer')
  ],
  extract: 'styles/papanasi.css',
  inject: false
};
