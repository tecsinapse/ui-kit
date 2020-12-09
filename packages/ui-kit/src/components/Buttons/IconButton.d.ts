import { FC } from 'react';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';

export interface IconButtonProps extends MuiIconButtonProps {
  customVariant?: 'success' | 'warning' | 'error';
  disabled?: boolean;
}

declare const IconButton: FC<IconButtonProps>;

export default IconButton;
