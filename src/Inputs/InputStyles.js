import {
  defaultGreen,
  defaultGreenDarker,
  defaultOrange,
  defaultOrangeDarker,
  defaultRed,
  defaultRedDarker,
} from '../colors';

export const stylesError = {
  cssOutlinedInputRed: {
    '&$cssFocused $notchedOutline': {
      borderColor: defaultRed,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultRedDarker} !important`,
    },
  },
  cssLabelRed: {
    '&$cssFocused': {
      color: defaultRed,
    },
  },
};
export const stylesSuccess = {
  cssOutlinedInputSuccess: {
    '& $notchedOutline': {
      borderColor: defaultGreen,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: defaultGreen,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultGreenDarker} !important`,
    },
  },
  cssLabelSuccess: {
    '&$cssFocused': {
      color: defaultGreen,
    },
    color: defaultGreen,
  },
};
export const stylesWarning = {
  cssOutlinedInputWarning: {
    '& $notchedOutline': {
      borderColor: defaultOrange,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: defaultOrange,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultOrangeDarker} !important`,
    },
  },
  cssLabelWarning: {
    '&$cssFocused': {
      color: defaultOrange,
    },
    color: defaultOrange,
  },
};

export const inputStyles = theme => ({
  inputRoot: {
    paddingRight: theme.spacing.unit / 3,
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.secondary.main,
    },
  },
  ...stylesError,
  ...stylesSuccess,
  ...stylesWarning,
  notchedOutline: {},
  cssFocused: {},
});
