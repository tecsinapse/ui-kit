import { FC, ReactNode } from 'react';

export type SelectOptionsProps = {
  value?: unknown;
  label?: string;
  disabled?: boolean;
};

export type SelectCustomActionProps = {
  buttonLabel: string;
  buttonColor?: 'primary' | 'secondary';
  buttonVariant?: 'contained' | 'text' | 'outlined';
  buttonIcon?: ReactNode;
  handleClick: () => void;
};

export interface SelectProps {
  /** Show 'select' option to select all options */
  allowSelectAll?: boolean;
  /** Fill div/screen width */
  fullWidth?: boolean;
  /** Disable Select */
  disabled?: boolean;
  /** Sucess input variant */
  success?: boolean;
  /** Warning input variant */
  warning?: boolean;
  /** Turn multi-selection on */
  isMulti?: boolean;
  /** Device Select variant view */
  variant?: 'auto' | 'mobile' | 'web';
  /** Select is touched */
  touched?: boolean;
  portal?: boolean;
  /** Error message/variant */
  error?: boolean | string;
  /** Input label */
  label?: string;
  /** Options available to Select */
  options: SelectOptionsProps[];
  /** Fired when change event */
  onChange?: (value: unknown) => void;
  /** Fired when blur event */
  onBlur?: (event: object | unknown) => void;
  /** Select prompt placeholder */
  selectPromptMessage?: string;
  /** Select all placeholder */
  selectAllMessage?: string;
  /** Minimum element width */
  minWidth?: string | number;
  /** Custom action placed on '`Select all`' line for multi select. The `buttonIcon` prop must be a mdi valid icon. `buttonColor` and `buttonVariant` are material-ui equivalent props. */
  customAction?: SelectCustomActionProps;
  /** Custom indicators to be placed as adornment */
  customIndicators?: ReactNode;
  /** Customize text field behind select */
  customTextField?: object;
}

declare const Select: FC<SelectProps>;

export default Select;
