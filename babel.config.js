module.exports = function presets(api) {
  const env = api.cache(() => process.env.NODE_ENV);
  const envConfig = { modules: false };
  const plugins = ['inline-react-svg', '@babel/plugin-syntax-flow'];
  if (env === 'test') {
    delete envConfig.modules;
    plugins.push('@babel/plugin-transform-modules-commonjs');
  }
  return {
    presets: ['@babel/preset-react', ['@babel/preset-env', envConfig]],
    plugins,
  };
};
