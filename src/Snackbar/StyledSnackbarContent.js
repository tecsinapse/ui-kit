import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from '../colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  successSnack: {
    backgroundColor: defaultGreen,
    color: 'white',
  },
  errorSnack: {
    backgroundColor: defaultRed,
    color: 'white',
  },
  infoSnack: {
    backgroundColor: defaultGrey,
    color: 'white',
  },
  warningSnack: {
    backgroundColor: defaultOrange,
    color: 'white',
  },
  iconSnack: {
    fontSize: 20,
  },
  iconVariantSnack: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  messageSnack: {
    display: 'flex',
    alignItems: 'center',
  },
  disabledSnack: {},
}));

export function StyledSnackbarContent(props) {
  const { className, message, onClose, variant } = props;
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[`${variant}Snack`], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.messageSnack}>
          <Icon className={clsx(classes.iconSnack, classes.iconVariantSnack)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.iconSnack} />
        </IconButton>,
      ]}
    />
  );
}

StyledSnackbarContent.defaultProps = {
  message: '',
  onClose: () => {},
};
StyledSnackbarContent.propTypes = {
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
};
