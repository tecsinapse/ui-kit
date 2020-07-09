import React from 'react';

import { ThemeProvider } from '@tecsinapse/ui-kit/src';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  success: {
    main: 'pink',
  },
});

export const TestProvider = ({ children }) => (
  <ThemeProvider variant="orange">
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </ThemeProvider>
);
