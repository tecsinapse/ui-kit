import React from 'react';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { theme, overrides } from './utils/theme';
import { sortStories } from './utils/helpers';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

const SORT_ORDER = {
  Introduction: ['Get started', 'Typography', 'Themes', 'Palette'],
  Alerts: [],
  Components: [],
  Files: [],
  Forms: [],
  Layout: [],
  Loadings: [],
  Menu: [],
  Notifications: [],
  'Packages @tecsinapse': [],
};

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  docs: {
    theme,
  },
  options: {
    storySort: sortStories(SORT_ORDER),
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
