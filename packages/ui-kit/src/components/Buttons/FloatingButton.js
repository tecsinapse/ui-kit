import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { buttonClassNameDefinition, buttonStyle } from './styles';

const useStyles = makeStyles(theme => ({
  ...buttonStyle(theme),
  button: {
    boxShadow: 'none',
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

  return (
    <Fab
      data-testid="test-render"
      aria-label="add"
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={clsx(
        className,
        buttonClassNameDefinition(classes, false, variantFab || customVariant),
        classes.button
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
  variantFab: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  disabled: PropTypes.bool,
};

export default FloatingButton;
