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
} from '../colors';
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
  ({ disabled, variant, children, ...props }, ref) => {
    const classes = useStyles();
    return (
      <MaterialIconButton
        className={clsx(
          buttonClassNameDefinition(classes, disabled, false, variant)
        )}
        color={
          ['primary', 'secondary'].indexOf(variant) > -1 ? variant : undefined
        }
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
  variant: 'success',
};
IconButton.propTypes = {
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'primary',
    'secondary',
  ]),
  disabled: PropTypes.bool,
};

export default IconButton;
