import { defaultRed } from 'utils/colors';
import { blue, grey } from '@material-ui/core/colors';

export const themes = {
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
  shallowBlue: 'shallowBlue',
  wingo: 'wingo',
};

const baseline = {
  primary: { main: '#616161', contrastText: '#ffffff' },
  secondary: { main: '#f99f1f', contrastText: '#ffffff' },
  error: {
    main: defaultRed,
    contrastText: '#ffffff',
  },
};

export const themeColors = {
  [themes.orange]: baseline,
  [themes.wingo]: baseline,
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
  [themes.shallowBlue]: {
    primary: { main: '#6e6e6e', light: '#b6b6b6', contrastText: '#ffffff' },
    secondary: { main: '#0063b4', contrastText: '#ffffff' },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
};
