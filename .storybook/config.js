import './InstallStyles';
import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import ThemeProvider from '../src/ThemeProvider';

const client = new GraphQLClient({
  url: 'https://countries.trevorblades.com/',
});

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: 'TecSinapse UI-KIT',
  url: 'https://github.com/tecsinapse/ui-kit',
});

const withGraphqlClientProvider = storyFn => (
  <ClientContext.Provider value={client}>{storyFn()}</ClientContext.Provider>
);

const withThemeProvider = storyFn => (
  <ThemeProvider variant="orange">{storyFn()}</ThemeProvider>
);
const req = require.context('../src', true, /\.story\.js$/);
// Sets the info addon's options.
setDefaults({
  header: false,
});

const withStoryStyles = storyFn => (
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

function loadStories() {
  addDecorator(withSmartKnobs);
  addDecorator(withKnobs);
  addDecorator(withInfo);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  addDecorator(withGraphqlClientProvider);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
