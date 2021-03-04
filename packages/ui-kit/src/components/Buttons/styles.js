import {
  defaultBlack,
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from 'utils/colors';

export const buttonStyle = ({ spacing }) => ({
  buttonSpan: {
    '& > :first-child': {
      marginRight: spacing(0.5),
    },
  },
  buttonColorDefault: {
    backgroundColor: `${defaultGrey}`,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultGrey,
    },
  },
  buttonColorSuccess: {
    backgroundColor: `${defaultGreen}`,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultGreen,
    },
  },
  buttonColorWarning: {
    backgroundColor: `${defaultOrange}`,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultOrange,
    },
  },
  buttonColorError: {
    backgroundColor: `${defaultRed}`,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultRed,
    },
  },
  buttonColorContrast: {
    backgroundColor: `${defaultBlack}`,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultBlack,
    },
  },
});

export function buttonClassNameDefinition(classes, margin, customVariant) {
  return {
    [classes.marginTop]: margin,
    [classes.buttonColorDefault]: customVariant === 'default',
    [classes.buttonColorSuccess]: customVariant === 'success',
    [classes.buttonColorWarning]: customVariant === 'warning',
    [classes.buttonColorError]: customVariant === 'error',
    [classes.buttonColorContrast]: customVariant === 'contrast',
  };
}
