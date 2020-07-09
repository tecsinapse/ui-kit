import { IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  defaultGreen,
  defaultGrey,
  defaultOrange,
  defaultRed,
} from '../../utils/colors';
import { buttonClassNameDefinition } from './Button';

const useStyles = makeStyles({
  disabled: {
    color: defaultGrey,
  },
  buttonColorSuccess: {
    color: defaultGreen,
  },
  buttonColorWarning: {
    color: defaultOrange,
  },
  buttonColorError: {
    color: defaultRed,
  },
});

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
  customVariant: PropTypes.oneOf(['success', 'warning', 'error']),
  disabled: PropTypes.bool,
};

export default IconButton;
