const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  stories: ['../docs/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../packages/react/dist'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    // Extract css files
    const cssRule = config.module.rules.find((x) => x.test.toString().includes('css'));
    config.plugins.unshift(new MiniCssExtractPlugin());
    const use = cssRule.use.filter((x) => !x.includes || !x.includes('style-loader'));
    use.unshift(MiniCssExtractPlugin.loader);
    cssRule.use = use;

    return config;
  }
};
