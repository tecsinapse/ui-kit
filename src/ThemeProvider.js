import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultRed } from './colors';

const themeColors = {
  orange: {
    primary: { main: '#616161', contrastText: '#ffffff' },
    secondary: { main: '#f99f1f', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  black: {
    primary: { main: '#000000', contrastText: '#ffffff' },
    secondary: { main: '#cd192d', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  redLight: {
    primary: { main: '#d8d8d8', light: '#ececec', contrastText: '#222121' },
    secondary: { main: '#e20000', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  green: {
    primary: { main: '#2b6d2e', light: '#a5a8a9', contrastText: '#ffffff' },
    secondary: { main: '#000000', contrastText: '#ffffff' },
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
    spacing: {
      unit: 12,
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
function ThemeProvider({ children, variant }) {
  return <MuiThemeProvider theme={theme(variant)}>{children}</MuiThemeProvider>;
}

ThemeProvider.propTypes = {
  variant: PropTypes.oneOf(['orange', 'blue', 'black', 'redLight', 'green'])
    .isRequired,
};

export default ThemeProvider;
