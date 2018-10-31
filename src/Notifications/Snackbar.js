import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledSnackbarContent } from './StyledSnackbarContent';

export function Snackbar({ show, onClose, variant, message }) {
  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <StyledSnackbarContent
        onClose={onClose}
        variant={variant}
        message={message}
      />
    </MaterialSnackbar>
  );
}

Snackbar.defaultProps = {
  message: '',
  onClose: () => {},
};
Snackbar.propTypes = {
  message: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
};
