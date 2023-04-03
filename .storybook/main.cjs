const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../docs/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../.themes'],
  core: {
    builder: 'webpack4'
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    '@a110/storybook-expand-all'
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, options) => {
    // Extract css files
    const cssRule = config.module.rules.find((x) => x.test.toString().includes('css'));
    config.plugins.unshift(new MiniCssExtractPlugin());

    const use = cssRule.use.filter((x) => !x.includes || !x.includes('style-loader'));
    use.unshift(MiniCssExtractPlugin.loader);
    cssRule.use = use.filter((x) => !x?.loader?.includes('style-loader'));

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });

    config.module.rules.push({
      test: /code\.tsx$/,
      loader: 'string-replace-loader',
      options: {
        // There is an error on storybook prism implementation and we cannot use <code html tag on the showcase
        search: '<code',
        replace: '<div '
      }
    });

    config.plugins.push();

    options.cache.set = () => Promise.resolve();

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    config.watch = false;

    options.watchOptions = { ignored: /src/ };

    return config;
  }
};
