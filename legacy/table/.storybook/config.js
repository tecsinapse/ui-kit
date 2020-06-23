import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { themeColors } from '@tecsinapse/ui-kit/build/ThemeProvider';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'TecSinapse Table',
  brandUrl: 'https://github.com/tecsinapse/table',
  brandImage:
    'https://www.tecsinapse.com.br/wp-content/themes/TecSinapse/assets/images/tecsinapse.svg',
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
    showRoots: true,
    theme,
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
