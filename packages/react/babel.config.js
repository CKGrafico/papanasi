module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['@babel/env'], ['@babel/preset-react']],
    ignore: ['node_modules']
  };
};
