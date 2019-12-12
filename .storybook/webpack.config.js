module.exports = {
  module: {
    rules: [
      {
        test: /\.story\.js?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
