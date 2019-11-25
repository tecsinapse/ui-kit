import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultBlue, defaultRed, defaultYellow } from './colors';
import { customVariantYellow } from './customVariant';

const themeColors = {
  orange: {
    primary: { main: '#616161', contrastText: '#ffffff' },
    secondary: { main: '#f99f1f', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  yellow: {
    secondary: { main: '#003473', contrastText: '#ffffff' },
    primary: { main: '#ffed00', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  black: {
    primary: { main: '#000000', light: '#323232', contrastText: '#ffffff' },
    secondary: { main: '#e31c1c', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  redLight: {
    primary: { main: '#2a2a2a', light: '#cbcbcb', contrastText: '#ffffff' },
    secondary: { main: '#e20000', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  green: {
    primary: { main: '#0b6836', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#000000', contrastText: '#ffffff' },
  },
  blue: {
    primary: blue,
  },
};
export const customDatePickerStyle = variant => {
  return variant === 'yellow'
    ? {
        highligthBgColor: defaultBlue,
        appBarBackgroundColor: defaultBlue,
      }
    : {};
};
export const renderStyledThemeColor = variant =>
  variant === 'yellow' ? 'secondary' : 'primary';
export const renderStyledLabel = (label, variant) => {
  if (variant === 'yellow') {
    return <div style={{ color: defaultBlue }}>{label}</div>;
  }
  return label;
};
export const customAppBarStyle = variant => {
  return variant === 'yellow'
    ? {
        titleColor: '#fff',
        subtitleColor: defaultYellow,
        breadcrumbBackgroundColor: defaultYellow,
        breadcrumbTextColor: '#000',
        activeBreadcrumbTextColor: defaultBlue,
        appBarBackgroundColor: defaultBlue,
      }
    : {};
};
const themeGlobals = variant => ({
  menuGlobal: {
    breadcrumbContrastText: variant === 'redLight' ? '#000000' : '#ffffff',
  },
});
const themeCustom = (variant, overrides) => {
  if (variant === 'yellow') {
    return { ...customVariantYellow, ...overrides };
  }
  return { ...overrides };
};
const theme = (variant, overrides) => {
  const themeCompile = {
    typography: {
      useNextVariants: true,
    },
    variant,
    spacing: 12,
    overrides: {
      MuiCollapse: {
        entered: {
          height: 'auto',
          overflow: 'visible',
        },
      },
      ...themeCustom(variant, overrides),
    },
    palette: { ...themeColors[variant] },
    ...themeGlobals(variant),
  };
  return createMuiTheme(themeCompile);
};
export function ThemeProvider({ children, variant, overrides }) {
  return (
    <MuiThemeProvider theme={theme(variant, overrides)}>
      {children}
    </MuiThemeProvider>
  );
}
export default ThemeProvider;
ThemeProvider.propTypes = {
  variant: PropTypes.oneOf([
    'orange',
    'blue',
    'black',
    'redLight',
    'green',
    'yellow',
  ]).isRequired,
};
