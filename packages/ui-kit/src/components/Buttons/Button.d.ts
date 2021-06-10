import { FC, ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';

export type ButtonVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'contrast';

export interface ButtonProps extends MuiButtonProps {
  /** Predefined custom button */
  customVariant?: ButtonVariant;
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
  /** Override default 'button' component. Useful for creating Links */
  component?: ReactNode;
  /** When using React Router Links, point to location using this property */
  to?: string;
}

declare const Button: FC<ButtonProps>;

export default Button;
