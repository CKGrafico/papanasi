module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['@babel/env']],
    ignore: ['node_modules']
  };
};
