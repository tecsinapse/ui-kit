import { IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styleByProps } from './buttonStyleByProp';
import {
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from '../colors';

const buttonStyle = {
  disabled: {
    color: defaultGrey,
  },
  buttonColorSuccess: {
    color: defaultGreen,
  },
  buttonColorWarning: {
    color: defaultOrange,
  },
  buttonColorError: {
    color: defaultRed,
  },
};

export const IconButton = ({ disabled, variant, children, ...props }) => (
  <MaterialIconButton
    style={styleByProps({ buttonStyle, disabled, variant })}
    color={['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined}
    disabled={disabled}
    {...props}
  >
    {children}
  </MaterialIconButton>
);

IconButton.defaultProps = {
  disabled: false,
  variant: 'success',
};
IconButton.propTypes = {
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'primary',
    'secondary',
  ]),
  disabled: PropTypes.bool,
};

export default IconButton;
