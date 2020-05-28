import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@tecsinapse/ui-kit';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    showRoots: true,
    theme: {
      brandTitle: 'TecSinapse Wizard',
      brandUrl: 'https://github.com/tecsinapse/wizard',
    },
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
