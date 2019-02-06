import {
  createMuiTheme,
  MuiThemeProvider as OldMuiThemeProvider,
} from '@material-ui/core';
import {
  install,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultOrange, defaultRed } from './colors';

install();

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
export function ThemeProvider({ children, variant }) {
  return (
    <OldMuiThemeProvider theme={theme(variant)}>
      <MuiThemeProvider theme={theme(variant)}>{children}</MuiThemeProvider>
    </OldMuiThemeProvider>
  );
}
export default ThemeProvider;
ThemeProvider.propTypes = {
  variant: PropTypes.oneOf(['orange', 'blue']).isRequired,
};
