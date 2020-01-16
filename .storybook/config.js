import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { withOptions } from '@storybook/addon-options';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { ThemeProvider } from '../src/ThemeProvider';
import { overrides } from './themeGlobals';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

withOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse UI-KIT',
  url: 'https://github.com/tecsinapse/ui-kit',
});

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
});

const withGraphqlClientProvider = storyFn => (
  <ClientContext.Provider value={client}>{storyFn()}</ClientContext.Provider>
);

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange" overrides={overrides}>
    {storyFn()}
  </ThemeProvider>
);
const req = require.context('../src', true, /\.story\.(js|mdx)$/);

function loadStories() {
  addDecorator(withThemeProvider);
  addDecorator(withGraphqlClientProvider);
  return req
    .keys()
    .map(fname => req(fname))
    .filter(exp => !!exp.default);
}

configure(loadStories, module);
