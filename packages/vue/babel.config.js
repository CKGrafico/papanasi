module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['@babel/env'], ['@vue/babel-preset-app']],
    ignore: ['node_modules']
  };
};
