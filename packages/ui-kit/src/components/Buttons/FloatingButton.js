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
  customVariant,
  size,
  onClick,
  color,
  ...props
}) => {
  const classes = useStyles();

  // TODO: Colocar Fab default para secondary.main

  return (
    <Fab
      aria-label="add"
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={clsx(
        className,
        buttonClassNameDefinition(classes, false, variantFab || customVariant)
      )}
      color={color}
      {...props}
    >
      {children || <Add />}
    </Fab>
  );
};
FloatingButton.defaultProps = {
  disabled: false,
  variantFab: undefined,
};
FloatingButton.propTypes = {
  /** This prop can be customVariant as well */
  variantFab: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  disabled: PropTypes.bool,
};
export default FloatingButton;
