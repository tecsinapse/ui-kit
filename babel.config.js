module.exports = function presets(api) {
  const env = api.cache(() => process.env.NODE_ENV);
  const envConfig = { modules: false };
  const plugins = [
    'inline-react-svg',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
  ];

  if (env === 'test') {
    delete envConfig.modules;
    plugins.push('@babel/plugin-transform-modules-commonjs');
    plugins.push('@babel/plugin-transform-runtime');
  }

  return {
    presets: ['@babel/preset-react', ['@babel/preset-env', envConfig]],
    plugins,
  };
};
