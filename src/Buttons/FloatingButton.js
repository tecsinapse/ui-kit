import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { globalStyle } from '../globalStyle';

const styles = {
  button: {
    position: 'fixed',
    bottom: 80,
    right: 30,
    borderRadius: '50%',
  },
  buttonColorSecondary: globalStyle.buttonColorSecondary,
};
export const FloatingButton = ({ icon, disabled, onClick }) => (
  <Button
    variant="fab"
    aria-label="add"
    disabled={disabled}
    onClick={onClick}
    style={{ ...styles.buttonColorSecondary, ...(disabled && styles.disabled) }}
  >
    {icon || <Add />}
  </Button>
);
FloatingButton.defaultProps = {
  disabled: false,
  icon: <Add />,
};
FloatingButton.propTypes = {
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
export default FloatingButton;