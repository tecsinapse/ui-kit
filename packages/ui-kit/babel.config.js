module.exports = function presets(api) {
  const env = api.cache(() => process.env.NODE_ENV);
  const envConfig = { modules: false };
  const plugins = [
    'inline-react-svg',
    '@babel/plugin-proposal-optional-chaining',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          context: './src/context',
          hooks: './src/hooks',
          themes: './src/themes',
          utils: './src/utils',
        },
      },
    ],
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
