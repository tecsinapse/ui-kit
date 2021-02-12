import { FC } from 'react';

export interface SwitchProps {
  /** label rigth switch */
  label1?: string;
  /** label left switch */
  label2?: string;
  /** Switch size */
  size?: 'small' | 'medium' | 'large';
  /** color switch*/
  color?: 'primary' | 'secondary';
  /**function used when switch is on */
  on?: (e: object) => void;
  /** function used when switch is off */
  off?: (e: object) => void;

}

declare const Switch: FC<SwitchProps>;

export default Switch;
