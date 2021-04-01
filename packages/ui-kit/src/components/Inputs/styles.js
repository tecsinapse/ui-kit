import {
  defaultGreen,
  defaultGreenDarker,
  defaultOrange,
  defaultOrangeDarker,
  defaultRed,
  defaultRedDarker,
} from 'utils/colors';

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
      borderColor: ({ variant }) =>
        variant === 'yellow'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
  },
  cssLabel: {
    '&$focused $cssFocused': {
      color: ({ variant }) =>
        variant === 'yellow'
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
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
