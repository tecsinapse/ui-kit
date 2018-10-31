import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultOrange, defaultRed } from './colors';

const themeColors = {
  orange: {
    primary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#ffffff',
    },
    secondary: {
      main: defaultOrange,
      contrastText: '#ffffff',
    },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  blue: {
    primary: blue,
  },
};

const theme = variant =>
  createMuiTheme({
    typography: {
      useNextVariants: true,
    },

    overrides: {
      MuiCollapse: {
        entered: {
          height: 'auto',
          overflow: 'visible',
        },
      },
    },
    palette: { ...themeColors[variant] },
  });
export function ThemeProvider({ children, variant }) {
  return <MuiThemeProvider theme={theme(variant)}>{children}</MuiThemeProvider>;
}
export default ThemeProvider;
ThemeProvider.propTypes = {
  variant: PropTypes.oneOf(['orange', 'blue']).isRequired,
};
