module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['@babel/env'], ['@babel/preset-react', { runtime: 'automatic' }]],
    ignore: ['node_modules']
  };
};
