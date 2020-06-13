import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from '../../colors';

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
});
export function buttonClassNameDefinition(classes, margin, customVariant) {
  return {
    [classes.marginTop]: margin,
    [classes.buttonColorDefault]: customVariant === 'default',
    [classes.buttonColorSuccess]: customVariant === 'success',
    [classes.buttonColorWarning]: customVariant === 'warning',
    [classes.buttonColorError]: customVariant === 'error',
  };
}
const useStyles = makeStyles(buttonStyle);

export const Button = React.forwardRef(
  (
    {
      submitting,
      fullWidth,
      disabled,
      customVariant,
      margin,
      type,
      size = 'medium',
      children,
      className,
      variant,
      disableElevation = true,
      ...props
    },
    ref
  ) => {
    const classes = useStyles();
    const classdef = buttonClassNameDefinition(classes, margin, customVariant);

    return (
      <MaterialButton
        type={type}
        classes={{ label: classes.buttonSpan }}
        className={clsx(className, classdef)}
        fullWidth={fullWidth}
        disabled={disabled || submitting}
        size={size}
        ref={ref}
        variant={customVariant ? 'contained' : variant}
        disableElevation={disableElevation}
        {...props}
      >
        {submitting && <CircularProgress size={20} />} {children}
      </MaterialButton>
    );
  }
);

Button.defaultProps = {
  submitting: false,
  margin: false,
  fullWidth: false,
  customVariant: undefined,
  disableElevation: true,
  type: 'submit',
  size: 'medium',
};
Button.propTypes = {
  /** Predefined custom button */
  customVariant: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  /** Button disabled during form submission */
  submitting: PropTypes.bool,
  /** Button elevation disabled */
  disableElevation: PropTypes.bool,
  /** Button fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Button CSS margin */
  margin: PropTypes.bool,
  /** Button html type */
  type: PropTypes.string,
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Button;
