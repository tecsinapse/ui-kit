/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  stories: ['../packages/*/stories/**/*.story.@(js|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async config => {
    config.resolve.modules = [
      path.resolve(__dirname, '../packages/ui-kit/src'),
      path.resolve(__dirname, '../packages/carousel/src'),
      path.resolve(__dirname, '../packages/pickers/src'),
      path.resolve(__dirname, '../packages/table/src'),
      path.resolve(__dirname, '../packages/uploader/src'),
      path.resolve(__dirname, '../packages/wizard/src'),
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/library': path.resolve(
        __dirname,
        '..',
        'node_modules',
        'babel-runtime/node_modules/core-js/library'
      ),
    };

    return config;
  },
};
