import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { setOptions } from '@storybook/addon-options';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@tecsinapse/ui-kit';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse Table',
  url: 'https://github.com/tecsinapse/table',
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
