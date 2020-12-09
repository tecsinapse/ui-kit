import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { themes } from 'themes/definitions';
import { theme } from 'themes/utils';

export function ThemeProvider({ children, variant, overrides, spacing = 12 }) {
  return (
    <MuiThemeProvider theme={theme(variant, overrides, spacing)}>
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
export * from './themes';

ThemeProvider.propTypes = {
  variant: PropTypes.oneOf(Object.keys(themes)).isRequired,
  overrides: PropTypes.object,
  spacing: PropTypes.number,
  children: PropTypes.node,
};
