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
        highligthBgColor: '#003473',
        appBarBackgroundColor: '#003473',
      }
    : {};
};
export const renderStyledLabel = (label, variant) => {
  if (variant === 'yellow') {
    return (
      <div style={{ color: '#003473', ':hover': { background: '#000' } }}>
        {label}
      </div>
    );
  }
  return label;
};
export const customAppBarStyle = variant => {
  return variant === 'yellow'
    ? {
        titleColor: '#fff',
        subtitleColor: '#ffed00',
        breadcrumbBackgroundColor: '#ffed00',
        breadcrumbTextColor: '#000',
        activeBreadcrumbTextColor: '#003473',
        appBarBackgroundColor: '#003473',
      }
    : {};
};
const themeGlobals = variant => ({
  menuGlobal: {
    breadcrumbContrastText: variant === 'redLight' ? '#000000' : '#ffffff',
  },
});
const themeCustom = variant => {
  if (variant !== 'yellow') {
    return {};
  }
  return {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#003473',
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#003473',
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: '#003473',
      },
      thumb: {
        backgroundColor: '#003473',
        borderColor: '#003473',
      },
      noPoint: {
        backgroundColor: '#003473',
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: '#003473',
      },
    },
  };
};
const theme = variant => {
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
      ...themeCustom(variant),
    },
    palette: { ...themeColors[variant] },
    ...themeGlobals(variant),
  };
  return createMuiTheme(themeCompile);
};
export function ThemeProvider({ children, variant }) {
  return <MuiThemeProvider theme={theme(variant)}>{children}</MuiThemeProvider>;
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
