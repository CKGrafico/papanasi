module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['@babel/env'], ['@babel/preset-typescript']],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
    ignore: ['node_modules']
  };
};
