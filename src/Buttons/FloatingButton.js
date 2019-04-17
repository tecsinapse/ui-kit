import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
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
export const FloatingButton = ({ children, disabled, variant, onClick }) => {
  const classes = useStyles();
  return (
    <Fab
      aria-label="add"
      disabled={disabled}
      onClick={onClick}
      color={
        ['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined
      }
      className={classNames(
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
