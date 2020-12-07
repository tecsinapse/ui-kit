import { FC } from 'react';
import { FabProps as MuiFabProps } from '@material-ui/core';

export interface FloatingButtonProps extends MuiFabProps {
  /** This prop can be customVariant as well */
  variantFab?: 'default' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

declare const FloatingButton: FC<FloatingButtonProps>;

export default FloatingButton;
