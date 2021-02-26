import { FC, ReactNode } from 'react';

export type LabelsPropTypes = {
  label: ReactNode;
  onClick: (e: object) => void;
  active: boolean;
};

export interface ButtonGroupProps {
  /** Button fill div/screen width */
  fullWidth?: boolean;
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Button multi-selectable */
  multiselect?: boolean;
  /** labels of buttons to be render */
  labels?: LabelsPropTypes[];
  /** orientation button*/
  orientation?: 'horizontal' | 'vertical';
  /** color button*/
  color?: 'primary' | 'secondary';
  /** compiled classes passed to main div*/
  classesName?: string;
  /** button container width*/
  width?: string | number;
  /** button container height*/
  height?: string | number;
}

declare const ButtonGroup: FC<ButtonGroupProps>;

export default ButtonGroup;
