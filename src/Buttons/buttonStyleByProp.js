import { globalStyle } from '../globalStyle';

export const styleByProps = ({ buttonStyle, variant, disabled, margin }) => {
  let variantStyle = {};
  if (variant === 'success') {
    variantStyle = {
      ...variantStyle,
      ...buttonStyle.buttonColorSuccess,
    };
  }
  if (variant === 'warning') {
    variantStyle = {
      ...variantStyle,
      ...buttonStyle.buttonColorWarning,
    };
  }
  if (variant === 'error') {
    variantStyle = {
      ...variantStyle,
      ...buttonStyle.buttonColorError,
    };
  }
  if (disabled) {
    variantStyle = {
      ...variantStyle,
      ...buttonStyle.disabled,
    };
  }
  if (margin) {
    variantStyle = {
      ...variantStyle,
      ...globalStyle.marginTop,
    };
  }

  return variantStyle;
};
