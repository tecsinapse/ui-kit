import { Button, CircularProgress } from '@material-ui/core';
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
  let buttonStyle;
  if (variant === 'first') {
    buttonStyle = {
      ...buttonStyle,
      ...style.buttonColorSuccess,
    };
  }
  if (variant === 'second') {
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

export const SubmitButton = ({
  label,
  submitting,
  fullWidth,
  disabled,
  onClick,
  variant,
  margin,
}) => (
  <Button
    type="submit"
    variant="contained"
    style={styleByProps({ disabled, variant, margin })}
    fullWidth={fullWidth}
    disabled={disabled || submitting}
    onClick={onClick}
  >
    {submitting && <CircularProgress size={20} />} {label}
  </Button>
);

SubmitButton.defaultProps = {
  submitting: false,
  margin: false,
  disabled: false,
  fullWidth: true,
};
SubmitButton.propTypes = {
  variant: PropTypes.oneOf(['first', 'second', 'third']).isRequired,
  label: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
