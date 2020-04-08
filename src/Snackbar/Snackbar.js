import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledSnackbarContent } from './StyledSnackbarContent';

export function Snackbar({
  show,
  onClose,
  variant,
  children,
  autoHideDuration,
}) {
  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={show}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <StyledSnackbarContent
        onClose={onClose}
        variant={variant}
        message={children}
      />
    </MaterialSnackbar>
  );
}

Snackbar.defaultProps = {
  onClose: () => {},
  autoHideDuration: 6000,
};
Snackbar.propTypes = {
  /** Close Snackbar func */
  onClose: PropTypes.func,
  /** Display snackbar */
  show: PropTypes.bool.isRequired,
  /** Snackbar variant */
  variant: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
  /** Auto hide timeout */
  autoHideDuration: PropTypes.number,
};
export default Snackbar;
