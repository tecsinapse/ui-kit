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
  size,
  onClick,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Fab
      aria-label="add"
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={clsx(
        className,
        buttonClassNameDefinition(classes, disabled, false, variantFab)
      )}
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
  variantFab: PropTypes.oneOf(['success', 'warning', 'error']),
  disabled: PropTypes.bool,
};
export default FloatingButton;
