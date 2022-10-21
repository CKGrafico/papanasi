module.exports = {
  plugins: [
    require('postcss-at-rules-variables')({
      atRules: ['each', 'mixin', 'custom-media'],
      variables: {
        ['--internal-columns']: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(', '),
        ['--internal-columns-total']: '12',
        ['--internal-breakpoints']: ['basic', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'].join(', '),
        ['--internal-flex-directions']: ['row', 'column', 'row-reverse', 'column-reverse'].join(', ')
      }
    }),
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
