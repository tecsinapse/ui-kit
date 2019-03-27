import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { defaultGrey } from '../colors';

export const ConfirmationAlert = ({
  show,
  proceed,
  dismiss,
  cancel,
  text,
  cancelButtonText,
  confirmButtonText,
}) => (
  <Dialog open={show} onClose={dismiss}>
    <DialogTitle id="alert-dialog-title"> {text} </DialogTitle>
    <DialogActions>
      <Button onClick={() => cancel()} style={{ color: defaultGrey }}>
        {cancelButtonText}
      </Button>
      <Button
        onClick={() => proceed()}
        style={{ color: defaultGrey }}
        autoFocus
      >
        {confirmButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);
ConfirmationAlert.defaultProps = {
  text: 'Você tem certeza?',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Confirmar',
};
ConfirmationAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  proceed: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  text: PropTypes.object,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
};
