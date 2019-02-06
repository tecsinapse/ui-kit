import { configure, addDecorator } from '@storybook/react';

import React from 'react';
import ThemeProvider from '../src/ThemeProvider';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';


import { withSmartKnobs } from 'storybook-addon-smart-knobs';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse UI-KIT',
  url: 'https://github.com/tecsinapse/ui-kit',
});

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange">{storyFn()}</ThemeProvider>
);
const req = require.context('../src', true, /\.story\.js$/);
// Sets the info addon's options.
setDefaults({
  header: false,
});

const withStoryStyles = storyFn => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {storyFn()}
    </div>
  );
};

function loadStories() {
  addDecorator(withSmartKnobs);
  addDecorator(withKnobs);
  addDecorator(withInfo);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
