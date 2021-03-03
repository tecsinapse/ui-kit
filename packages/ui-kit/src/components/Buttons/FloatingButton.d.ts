import { FC } from 'react';
import { FabProps as MuiFabProps } from '@material-ui/core';
import {ButtonVariant} from "./Button";

export interface FloatingButtonProps extends MuiFabProps {
  /** This prop can be customVariant as well */
  variantFab?: ButtonVariant;
  disabled?: boolean;
}

declare const FloatingButton: FC<FloatingButtonProps>;

export default FloatingButton;
