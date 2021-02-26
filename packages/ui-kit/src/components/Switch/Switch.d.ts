import { FC } from 'react';

export interface SwitchProps {
  /** labels of object (left/right) */
  labels?: object
  /** Switch size */
  size?: 'small' | 'medium' | 'large';
  /** color switch*/
  color?: 'primary' | 'secondary';
  /**function used when switch is on */
  onChange?: (e: object) => void;


}

declare const Switch: FC<SwitchProps>;

export default Switch;
