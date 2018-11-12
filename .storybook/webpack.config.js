module.exports = {
  module: {
    rules: [
      {
        test: /\.story\.js?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
    ],
  },
};
