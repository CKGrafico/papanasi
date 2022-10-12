const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../docs/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../packages/react/dist'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss'
  ],
  framework: '@storybook/react',
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">
  `,
  webpackFinal: async (config, options) => {
    // Extract css files
    const cssRule = config.module.rules.find((x) => x.test.toString().includes('css'));
    config.plugins.unshift(new MiniCssExtractPlugin());

    const use = cssRule.use.filter((x) => !x.includes || !x.includes('style-loader'));
    use.unshift(MiniCssExtractPlugin.loader);
    cssRule.use = use.filter((x) => !x?.loader?.includes('style-loader'));

    options.cache.set = () => Promise.resolve();

    return config;
  }
};
