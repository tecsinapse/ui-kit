import { TextFieldProps } from '@material-ui/core';
import { FC, ReactNode } from 'react';

export interface ColorPickerProps {
  /** Value selected */
  value?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Color formar converter (rgba, rgb, hex) */
  convert?: 'rgba' | 'rgb' | 'hex' | 'rgba_hex' | 'rgba_rgb';
  /** Initial value */
  defaultValue?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  hintText?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Input floating label */
  floatingLabelText?: string;
  /** Props passed to TextField Input */
  TextFieldProps?: TextFieldProps;
  /** Custom Input component */
  TextFieldComponent?: ReactNode;
  /** Show palette picker */
  showPicker?: boolean;
  /** Show palette open event handler */
  setShowPicker?: (state: boolean) => void;
  internalValue?: string;
  /** Set value event handler */
  setValue?: (value: string) => void;
  /** Disable the input */
  disabled?: boolean;
}

declare const ColorPicker: FC<ColorPickerProps>;

export default ColorPicker;
