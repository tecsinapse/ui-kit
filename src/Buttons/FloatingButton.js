import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import { styleByProps } from './buttonStyleByProp';
import { buttonStyle } from './Button';

const styles = {
  button: {
    position: 'fixed',
    bottom: 80,
    right: 30,
    borderRadius: '50%',
  },
};
export const FloatingButton = ({ children, disabled, variant, onClick }) => (
  <Fab
    aria-label="add"
    disabled={disabled}
    onClick={onClick}
    color={['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined}
    style={{
      ...styles.button,
      ...styleByProps({ buttonStyle, variant, disabled }),
    }}
  >
    {children || <Add />}
  </Fab>
);
FloatingButton.defaultProps = {
  disabled: false,
  variant: 'success',
};
FloatingButton.propTypes = {
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'primary',
    'secondary',
  ]),
  disabled: PropTypes.bool,
};
export default FloatingButton;
