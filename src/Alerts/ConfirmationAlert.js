import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { defaultGrey } from '../colors';

export const ConfirmationAlert = ({ show, proceed, dismiss, cancel }) => (
  <Dialog open={show} onClose={dismiss}>
    <DialogTitle id="alert-dialog-title"> Você tem certeza?</DialogTitle>
    <DialogActions>
      <Button onClick={() => cancel()} style={{ color: defaultGrey }}>
        Cancelar
      </Button>
      <Button
        onClick={() => proceed()}
        style={{ color: defaultGrey }}
        autoFocus
      >
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);
ConfirmationAlert.propTypes = {
  show: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
