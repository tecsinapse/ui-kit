import { FC } from 'react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';

export interface ButtonProps extends MuiButtonProps {
  /** Predefined custom button */
  customVariant?: 'default' | 'success' | 'warning' | 'error';
  /** Button disabled during form submission */
  submitting?: boolean;
  /** Button elevation disabled */
  disableElevation?: boolean;
  /** Button fill div/screen width */
  fullWidth?: boolean;
  /** Button CSS margin */
  margin?: boolean;
  /** Button html type */
  type?: 'submit' | 'button' | 'reset';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
}

declare const Button: FC<ButtonProps>;

export default Button;
