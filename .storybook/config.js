import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import { ThemeProvider, themeColors } from '@tecsinapse/ui-kit';

import { create } from '@storybook/theming/create';
import { overrides } from './themeGlobals';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

const theme = create({
  base: 'light',
  brandTitle: 'TecSinapse UI-KIT',
  brandUrl: 'https://github.com/tecsinapse/ui-kit',
  fontBase: 'Roboto',
  colorPrimary: themeColors.orange.primary.main,
  colorSecondary: themeColors.orange.secondary.main,
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
    showRoots: true,
    theme,
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
const req = require.context('../packages', true, /\.story\.(js|mdx)$/);

function loadStories() {
  addDecorator(withThemeProvider);
  addDecorator(withGraphqlClientProvider);

  return req
    .keys()
    .map(fname => req(fname))
    .filter(exp => !!exp.default);
}

configure(loadStories, module);
