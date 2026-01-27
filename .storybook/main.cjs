const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: [
  '../docs/**/*.mdx',
  '../src/**/*.mdx',
  '../docs/**/*.stories.@(js|jsx|ts|tsx)',
  '../src/**/*.stories.@(js|jsx|ts|tsx)'
],
  staticDirs: ['../.themes', { from: '../docs/resources', to: '/' }],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  addons: [
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        postCss: {
          implementation: require('postcss')
        }
      }
    }
  ],

  typescript: {
    reactDocgen: false
  },

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

    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../packages'),
        path.resolve(__dirname, '../docs')
      ],
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [require.resolve('@babel/preset-env'), { targets: 'defaults' }],
            [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
            require.resolve('@babel/preset-typescript')
          ]
        }
      }
    });

    config.plugins.push();

    options.cache.set = () => Promise.resolve();

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    config.watch = false;

    options.watchOptions = { ignored: /src/ };

    return config;
  },

  features: {
    actions: false,
    backgrounds: false,
    viewport: false,
    measure: false,
    outline: false,
    toolbars: false
  }
};
