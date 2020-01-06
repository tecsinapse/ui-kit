import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { setOptions } from '@storybook/addon-options';
import { ThemeProvider } from '@tecsinapse/ui-kit';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse Table',
  url: 'https://github.com/tecsinapse/table',
});

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange">{storyFn()}</ThemeProvider>
);
const req = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
