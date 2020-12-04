const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });
  config.module.rules.push({
    test: /\.story\.js?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });
  config.resolve.modules.push(
    path.resolve(__dirname, '../packages/ui-kit/src'),
    path.resolve(__dirname, '../packages/carousel/src'),
    path.resolve(__dirname, '../packages/pickers/src'),
    path.resolve(__dirname, '../packages/table/src'),
    path.resolve(__dirname, '../packages/uploader/src'),
    path.resolve(__dirname, '../packages/wizard/src'),
    path.resolve(__dirname)
  );

  return config;
};
