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
} from '../colors';

export const buttonStyle = ({ spacing }) => ({
  buttonSpan: {
    '& > :first-child': {
      marginRight: spacing(0.5),
    },
  },
  disabled: {
    backgroundColor: defaultGrey,
    color: 'white',
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
export function buttonClassNameDefinition(
  classes,
  disabled,
  margin,
  customVariant
) {
  return {
    [classes.disabled]: disabled,
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
      ...props
    },
    ref
  ) => {
    const classes = useStyles();
    const classdef = buttonClassNameDefinition(
      classes,
      disabled,
      margin,
      customVariant
    );
    return (
      <MaterialButton
        type={type}
        classes={{ label: classes.buttonSpan }}
        className={clsx(className, classdef)}
        fullWidth={fullWidth}
        disabled={disabled || submitting}
        size={size}
        ref={ref}
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
  type: 'submit',
  size: 'medium',
};
Button.propTypes = {
  customVariant: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  submitting: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Button;
