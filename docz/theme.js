import React from 'react';
import { theme } from 'docz';
import ThemeDefault from 'docz-theme-default';
import { ThemeProvider } from '../src';

const Theme = () => (
  <ThemeProvider variant="orange">
    <ThemeDefault />
  </ThemeProvider>
);

const themeConfig = {
  colors: {
    primary: 'tomato',
    secondary: 'khaki',
    gray: 'lightslategray',
  },
};

export default theme(themeConfig)(Theme);
