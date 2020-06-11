import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { blue, grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import { defaultBlue, defaultRed, defaultYellow } from './colors';
import { customVariantBlueGrey, customVariantYellow } from './customVariant';

export const themeColors = {
  orange: {
    primary: { main: '#616161', contrastText: '#ffffff' },
    secondary: { main: '#f99f1f', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  yellow: {
    primary: { main: '#ffed00', contrastText: '#ffffff' },
    secondary: { main: '#003473', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  blueGrey: {
    primary: { main: '#d8d7d5', light: '#0f3399', contrastText: '#000000' },
    secondary: { main: '#0f3399', contrastText: '#ffffff' },
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
  deepBlack: {
    primary: { main: '#000000', light: '#323232', contrastText: '#ffffff' },
    secondary: grey,
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  blackOrange: {
    primary: { main: '#616161', light: '#151314', contrastText: '#ffffff' },
    secondary: { main: '#ef7500', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  blueLight: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#009ada', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  deepBlue: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#0d4671', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  micBlue: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#2056ae', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  greyLight: {
    primary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9d0d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e6433f',
      contrastText: '#ffffff',
    },
    background: {
      main: '#f5f5f5',
    },
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
export const renderStyledColor = variant =>
  variant === 'yellow' || variant === 'blueGrey' ? 'secondary' : 'primary';
export const renderStyledLabel = (label, variant) => {
  if (variant === 'yellow') {
    return <div style={{ color: defaultBlue }}>{label}</div>;
  }
  if (variant === 'blueGrey') {
    return <div style={{ color: '#0f3399' }}>{label}</div>;
  }
  return label;
};
export const customAppBarStyle = variant => {
  if (variant === 'yellow') {
    return {
      titleColor: '#fff',
      subtitleColor: defaultYellow,
      breadcrumbBackgroundColor: defaultYellow,
      breadcrumbTextColor: '#000',
      activeBreadcrumbTextColor: defaultBlue,
      appBarBackgroundColor: defaultBlue,
    };
  }
  if (variant === 'blueGrey') {
    return {
      activeBreadcrumbTextColor: '#fff',
    };
  }
  return {};
};
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
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

  if (variant === 'blueGrey') {
    return { ...customVariantBlueGrey, ...overrides };
  }

  return { ...overrides };
};
const theme = (variant, overrides, spacing) => {
  const themeCompile = {
    typography: {
      useNextVariants: true,
    },
    variant,
    spacing,
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
export function ThemeProvider({ children, variant, overrides, spacing = 12 }) {
  return (
    <MuiThemeProvider theme={theme(variant, overrides, spacing)}>
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
    'blueGrey',
    'yellow',
    'blackOrange',
    'blueLight',
    'deepBlack',
    'deepBlue',
    'micBlue',
    'greyLight',
  ]).isRequired,
};
