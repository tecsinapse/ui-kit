import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { blue, grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import { defaultBlue, defaultRed, defaultYellow } from './colors';
import {
  customVariantBlueGrey,
  customVariantBlueOcean,
  customVariantYellow,
} from './customVariant';

const themes = {
  orange: 'orange',
  yellow: 'yellow',
  blueGrey: 'blueGrey',
  black: 'black',
  redLight: 'redLight',
  green: 'green',
  deepBlack: 'deepBlack',
  blackOrange: 'blackOrange',
  blueLight: 'blueLight',
  deepBlue: 'deepBlue',
  micBlue: 'micBlue',
  greyLight: 'greyLight',
  lightOrange: 'lightOrange',
  blueOcean: 'blueOcean',
};

export const themeColors = {
  [themes.orange]: {
    primary: { main: '#616161', contrastText: '#ffffff' },
    secondary: { main: '#f99f1f', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.yellow]: {
    primary: { main: '#ffed00', contrastText: '#ffffff' },
    secondary: { main: '#003473', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.blueGrey]: {
    primary: { main: '#d8d7d5', light: '#0f3399', contrastText: '#000000' },
    secondary: { main: '#0f3399', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.black]: {
    primary: { main: '#000000', light: '#323232', contrastText: '#ffffff' },
    secondary: { main: '#e31c1c', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.redLight]: {
    primary: { main: '#2a2a2a', light: '#cbcbcb', contrastText: '#ffffff' },
    secondary: { main: '#e20000', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.green]: {
    primary: { main: '#0b6836', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#000000', contrastText: '#ffffff' },
  },
  [themes.blue]: {
    primary: blue,
  },
  [themes.deepBlack]: {
    primary: { main: '#000000', light: '#323232', contrastText: '#ffffff' },
    secondary: grey,
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.blackOrange]: {
    primary: { main: '#616161', light: '#151314', contrastText: '#ffffff' },
    secondary: { main: '#ef7500', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.lightOrange]: {
    primary: { main: '#f99f1f', contrastText: '#ffffff' },
    secondary: { main: '#616161', light: '#151314', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.blueLight]: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#009ada', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.deepBlue]: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#0d4671', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.micBlue]: {
    primary: { main: '#616161', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#2056ae', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  [themes.greyLight]: {
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
  [themes.blueOcean]: {
    primary: { main: '#4CC7F4', contrastText: '#ffffff' },
    secondary: { main: '#001E50', contrastText: '#ffffff' },
    error: {
      main: '#e3002d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffd101',
      contrastText: '#ffffff',
    },
    success: {
      main: '#00872b',
      contrastText: '#ffffff',
    },
  },
};
export const customDatePickerStyle = variant => {
  if (variant === themes.yellow) {
    return {
      highligthBgColor: defaultBlue,
      appBarBackgroundColor: defaultBlue,
    };
  }

  if (variant === themes.blueOcean) {
    const pallete = themeColors[variant];

    return {
      highligthBgColor: pallete.secondary.main,
      appBarBackgroundColor: pallete.secondary.main,
    };
  }

  return {};
};

export const renderStyledColor = variant =>
  variant === themes.yellow || themes.blueGrey || themes.blueOcean
    ? 'secondary'
    : 'primary';

export const renderStyledLabel = (label, variant) => {
  const customThemes = [themes.yellow, themes.blueGrey, themes.blueOcean];

  if (customThemes.includes(variant)) {
    const pallete = themeColors[variant];
    const customColor = { color: pallete.secondary.main };

    return <div style={customColor}>{label}</div>;
  }

  return label;
};

export const customAppBarStyle = variant => {
  if (variant === themes.yellow) {
    return {
      titleColor: '#fff',
      subtitleColor: defaultYellow,
      breadcrumbBackgroundColor: defaultYellow,
      breadcrumbTextColor: '#000',
      activeBreadcrumbTextColor: defaultBlue,
      appBarBackgroundColor: defaultBlue,
    };
  }

  if (variant === themes.blueGrey) {
    return {
      activeBreadcrumbTextColor: '#fff',
    };
  }

  if (variant === themes.blueOcean) {
    const pallete = themeColors[variant];

    return {
      appBarBackgroundColor: pallete.secondary.main,
      titleColor: pallete.primary.contrastText,
      subtitleColor: pallete.primary.main,
      breadcrumbBackgroundColor: pallete.primary.main,
      breadcrumbTextColor: pallete.secondary.main,
      activeBreadcrumbTextColor: pallete.secondary.main,
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
    breadcrumbContrastText: variant === themes.redLight ? '#000000' : '#ffffff',
  },
});

const themeCustom = (variant, overrides) => {
  if (variant === themes.yellow) {
    return { ...customVariantYellow, ...overrides };
  }

  if (variant === themes.blueGrey) {
    return { ...customVariantBlueGrey, ...overrides };
  }

  if (variant === themes.blueOcean) {
    const themePallete = themeColors[variant];
    const themeAdjustments = customVariantBlueOcean(themePallete);

    return { ...themeAdjustments, ...overrides };
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
  variant: PropTypes.oneOf(Object.keys(themes)).isRequired,
};
