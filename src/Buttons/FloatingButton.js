import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { buttonClassNameDefinition, buttonStyle } from './Button';

const useStyles = makeStyles(theme => ({
  ...buttonStyle(theme),
  button: {
    position: 'fixed',
    bottom: 80,
    right: 30,
    borderRadius: '50%',
  },
}));
export const FloatingButton = ({
  className,
  children,
  disabled,
  variantFab,
  variant,
  size,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Fab
      aria-label="add"
      disabled={disabled}
      onClick={onClick}
      variant={variantFab}
      size={size}
      color={
        ['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined
      }
      className={clsx(
        className,
        buttonClassNameDefinition(classes, disabled, false, variant)
      )}
    >
      {children || <Add />}
    </Fab>
  );
};
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
