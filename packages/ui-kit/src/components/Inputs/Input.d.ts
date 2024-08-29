import { FC, ReactNode } from 'react';
import { TextFieldProps } from '@material-ui/core';

export type MaskProps = {
  mask: Function | unknown;
  pipe: Function;
};

export interface InputProps extends Omit<TextFieldProps, 'error'> {
  /** Input fill div/screen width */
  fullWidth?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Input success variant */
  success?: boolean;
  /** Input warning variant */
  warning?: boolean;
  /** Input error variant */
  error?: boolean | string;
  /** Input placeholder label */
  label?: string;
  /** Input html name */
  name: string;
  /** Fired when input changes */
  onChange?: (value: unknown) => void;
  /** Input mask. `@tecsinapse/ui-kit` provides a preset of masks:
   * 'cep', 'phone', 'cel', 'cpf', 'currency', 'cnpj', 'plate', 'cellphone', 'cpfcnpj', 'date', 'time', 'creditcard', 'cvv', 'mounthyear', 'percentage' and 'year'.
   * See below form more info. */
  mask?:
    | MaskProps
    | 'cep'
    | 'phone'
    | 'cell'
    | 'cpf'
    | 'currency'
    | 'cnpj'
    | 'plate'
    | 'cellphone'
    | 'cellphonewithddi'
    | 'cpfcnpj'
    | 'date'
    | 'time'
    | 'percentage'
    | 'year'
    | 'creditcard'
    | 'cvv'
    | 'mounthyear'
    | unknown
    | Function
    | boolean;
  /** Shrink label */
  shrinkLabel?: boolean;
  /** Placeholder when input is focused */
  placeholder?: string;
  /** Helper text place below input */
  helperText?: string;
  /** Adornment Icon placed at Input end */
  endAdornment?: ReactNode;
  /** Put a margin on adornment Icon placed at Input end */
  endAdornmentMargin?: boolean;
  /** Adornment Icon placed at Input start */
  startAdornment?: ReactNode;
  /** Autocomplete html specification for text input */
  autoComplete?: 'on' | 'off';
  /** Variant for Input display */
  variantDevice?: 'auto' | 'web' | 'mobile';
  /** Set maxLength size for Input */
  maxLength?: number;
}

declare const Input: FC<InputProps>;

export default Input;
