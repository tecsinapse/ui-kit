import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';

import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { ThemeProvider } from '@tecsinapse/ui-kit';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse Pickers',
  url: 'https://github.com/tecsinapse/pickers',
});

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange">{storyFn()}</ThemeProvider>
);
const req = require.context('../src', true, /\.story\.js$/);

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
  addDecorator(withSmartKnobs);
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
