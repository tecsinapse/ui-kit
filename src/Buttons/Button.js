import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
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
    backgroundColor: defaultGrey,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultGrey,
    },
  },
  buttonColorSuccess: {
    backgroundColor: defaultGreen,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultGreen,
    },
  },
  buttonColorWarning: {
    backgroundColor: defaultOrange,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultOrange,
    },
  },
  buttonColorError: {
    backgroundColor: defaultRed,
    color: 'white',
    '&:hover': {
      backgroundColor: defaultRed,
    },
  },
});
export function buttonClassNameDefinition(classes, disabled, margin, variant) {
  return {
    [classes.disabled]: disabled,
    [classes.marginTop]: margin,
    [classes.buttonColorDefault]: variant === 'default',
    [classes.buttonColorSuccess]: variant === 'success',
    [classes.buttonColorWarning]: variant === 'warning',
    [classes.buttonColorError]: variant === 'error',
  };
}
const useStyles = makeStyles(buttonStyle);

export const Button = ({
  submitting,
  fullWidth,
  disabled,
  variant,
  margin,
  type,
  size = 'medium',
  children,
  className,
  ...props
}) => {
  const classes = useStyles();
  const classdef = buttonClassNameDefinition(
    classes,
    disabled,
    margin,
    variant
  );
  return (
    <MaterialButton
      type={type}
      variant="contained"
      classes={{ label: classes.buttonSpan }}
      className={classNames(className, classdef)}
      color={
        ['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined
      }
      fullWidth={fullWidth}
      disabled={disabled || submitting}
      size={size}
      {...props}
    >
      {submitting && <CircularProgress size={20} />} {children}
    </MaterialButton>
  );
};

Button.defaultProps = {
  submitting: false,
  margin: false,
  disabled: false,
  fullWidth: false,
  variant: 'success',
  type: 'submit',
  size: 'medium',
};
Button.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'error',
    'primary',
    'secondary',
  ]),
  submitting: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Button;
