import {
  defaultGreen,
  defaultGreenDarker,
  defaultWarning,
  defaultWarningDarker,
  defaultRed,
  defaultRedDarker,
} from '../../utils/colors';

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
      borderColor: defaultWarning,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: defaultWarning,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultWarningDarker} !important`,
    },
  },
  cssLabelWarning: {
    '&$cssFocused': {
      color: defaultWarning,
    },
    color: defaultWarning,
  },
};

export const styles = theme => ({
  adornedMarginLeft: {
    marginLeft: theme.spacing(0.5),
  },
  adornedMarginRight: {
    marginRight: theme.spacing(0.5),
  },
  adornedMarginEnd: {
    paddingRight: `0px !important`,
  },
  inputRoot: {
    paddingRight: theme.spacing(0.333),
  },
  cssOutlinedInput: {
    '&$focused $notchedOutline $cssFocused': {
      borderColor: theme.palette.primary.main,
    },
  },
  cssLabel: {
    '&$focused $cssFocused': {
      color: theme.palette.primary.main,
    },
  },
  ...stylesError,
  ...stylesSuccess,
  ...stylesWarning,
  notchedOutline: () => ({}),
  focused: () => ({}),
  cssFocused: () => ({}),
  error: () => ({}),
  disabled: () => ({}),
});
