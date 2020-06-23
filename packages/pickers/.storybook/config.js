import {addDecorator, addParameters, configure} from '@storybook/react';
import React from 'react';
import {setOptions} from '@storybook/addon-options';
import {ThemeProvider} from '@tecsinapse/ui-kit';
import {DocsContainer, DocsPage} from '@storybook/addon-docs/blocks';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse Pickers',
  url: 'https://github.com/tecsinapse/pickers',
});

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange">{storyFn()}</ThemeProvider>
);
const req = require.context('../src', true, /\.story\.(js|mdx)$/);

function loadStories() {
  addDecorator(withThemeProvider);
  return req
    .keys()
    .map(fname => req(fname))
    .filter(exp => !!exp.default);
}

configure(loadStories, module);
