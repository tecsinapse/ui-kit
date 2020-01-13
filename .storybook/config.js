import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { setOptions } from '@storybook/addon-options';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { ThemeProvider } from '../src/ThemeProvider';
import { overrides } from './themeGlobals';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

setOptions({
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

const withStoryStyles = storyFn => (
  <div
    style={{
      height: '100vh',
      width: '100%',
    }}
  >
    {storyFn()}
  </div>
);

function loadStories() {
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  addDecorator(withGraphqlClientProvider);
  return req
    .keys()
    .map(fname => req(fname))
    .filter(exp => !!exp.default);
}

configure(loadStories, module);
