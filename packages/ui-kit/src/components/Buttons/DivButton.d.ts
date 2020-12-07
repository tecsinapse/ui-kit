import { FC } from 'react';
import { ButtonBaseProps as MuiButtonBaseProps } from '@material-ui/core';

export interface DivButtonProps extends MuiButtonBaseProps {
  /** Text to be displayed */
  infoText?: string;
  /** Number of notifications */
  notifyNumber?: number;
}

declare const DivButton: FC<DivButtonProps>;

export default DivButton;
