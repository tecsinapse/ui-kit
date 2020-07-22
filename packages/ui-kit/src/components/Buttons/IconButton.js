import { IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { buttonClassNameDefinition } from './Button';

const useStyles = makeStyles(({ palette }) => ({
  disabled: {
    color: palette.text.disabled,
  },
  buttonColorSuccess: {
    color: palette.success.main,
  },
  buttonColorWarning: {
    color: palette.warning.main,
  },
  buttonColorError: {
    color: palette.error.main,
  },
  buttonColorInfo: {
    color: palette.info.main,
  },
}));

export const IconButton = React.forwardRef(
  ({ disabled, customVariant, children, className, ...props }, ref) => {
    const classes = useStyles();
    const classdef = buttonClassNameDefinition(classes, false, customVariant);

    return (
      <MaterialIconButton
        className={clsx(className, classdef)}
        disabled={disabled}
        {...props}
        ref={ref}
      >
        {children}
      </MaterialIconButton>
    );
  }
);

IconButton.defaultProps = {
  disabled: false,
  customVariant: undefined,
};
IconButton.propTypes = {
  customVariant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  disabled: PropTypes.bool,
};

export default IconButton;
