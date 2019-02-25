import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styleByProps } from './buttonStyleByProp';
import {
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from '../colors';

export const buttonStyle = {
  disabled: {
    backgroundColor: defaultGrey,
    color: 'white',
  },
  buttonColorSuccess: {
    backgroundColor: defaultGreen,
    color: 'white',
  },
  buttonColorWarning: {
    backgroundColor: defaultOrange,
    color: 'white',
  },
  buttonColorError: {
    backgroundColor: defaultRed,
    color: 'white',
  },
};

export const Button = ({
  submitting,
  fullWidth,
  disabled,
  variant,
  margin,
  type,
  children,
  ...props
}) => (
  <MaterialButton
    type={type}
    variant="contained"
    style={styleByProps({ buttonStyle, disabled, variant, margin })}
    color={['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined}
    fullWidth={fullWidth}
    disabled={disabled || submitting}
    {...props}
  >
    {submitting && <CircularProgress size={20} />} {children}
  </MaterialButton>
);

Button.defaultProps = {
  submitting: false,
  margin: false,
  disabled: false,
  fullWidth: false,
  variant: 'success',
  type: 'submit',
};
Button.propTypes = {
  variant: PropTypes.oneOf([
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
};

export default Button;
