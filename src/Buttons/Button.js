import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { globalStyle } from '../globalStyle';

const style = {
  disabled: globalStyle.disabled,
  buttonColorSuccess: globalStyle.buttonColorSuccess,
  buttonColorSecondary: globalStyle.buttonColorSecondary,
  buttonColorThird: globalStyle.buttonColorThird,
};
const styleByProps = ({ variant, disabled, margin }) => {
  let buttonStyle = {};
  if (variant === 'success') {
    buttonStyle = {
      ...buttonStyle,
      ...style.buttonColorSuccess,
    };
  }
  if (variant === 'secondary') {
    buttonStyle = {
      ...buttonStyle,
      ...style.buttonColorSecondary,
    };
  }
  if (variant === 'third') {
    buttonStyle = {
      ...buttonStyle,
      ...style.buttonColorThird,
    };
  }
  if (disabled) {
    buttonStyle = {
      ...buttonStyle,
      ...style.disabled,
    };
  }
  if (margin) {
    buttonStyle = {
      ...buttonStyle,
      ...globalStyle.marginTop,
    };
  }

  return buttonStyle;
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
    style={styleByProps({ disabled, variant, margin })}
    fullWidth={fullWidth}
    disabled={disabled || submitting}
    {...props}
  >
    {submitting && <CircularProgress size={20} />} {children}
  </MaterialButton>
);

export const supportedVariants = ['success', 'secondary', 'third'];
Button.defaultProps = {
  submitting: false,
  margin: false,
  disabled: false,
  fullWidth: false,
  variant: 'success',
  type: 'submit',
};
Button.propTypes = {
  variant: PropTypes.oneOf(supportedVariants),
  submitting: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
