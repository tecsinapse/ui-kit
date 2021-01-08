import React from 'react';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { theme, overrides } from './utils/theme';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

const sortStories = (a, b) =>
  a[1].kind === b[1].kind
    ? 0
    : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  docs: {
    theme,
  },
  options: {
    storySort: sortStories,
  },
};

const withGraphqlClientProvider = Story => (
  <ClientContext.Provider value={client}>
    <Story />
  </ClientContext.Provider>
);

const withThemeProvider = Story => (
  <ThemeProvider variant="orange" overrides={overrides}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider, withGraphqlClientProvider];
