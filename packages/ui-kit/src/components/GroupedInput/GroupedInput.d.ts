import { FC, ReactNode } from 'react';

export interface GroupedInputProps {
  /** Input name */
  name: string;
  /** Component name on header */
  header: ReactNode;
  /** Input label */
  label: string;
  /** Array of field values */
  values: string[];
  /** Error input variant */
  error?: string[] | string;
  /** Success input variant */
  success?: boolean[];
  /** Warning input variant */
  warnings?: boolean[];
  /** Function to execute when pushing a new input */
  push: (value?: unknown) => void;
  /** Function to execute when deleting a input */
  remove: (index: number) => void;
  /** Change event handler */
  onChange: (target: unknown, index: unknown) => void;
  /** Spacing between inputs */
  spacing?: number;
  /** Extra small screen grid size */
  xs?: number;
  /** Small screen grid size */
  sm?: number;
  /** Large screen grid size */
  lg?: number;
  /** Extra large screen grid size */
  xl?: number;
  /** Show divider on end */
  hr?: boolean;
  /** Case 'inside' input field will be values[0], otherwise 'outside' it will be outside list and after input will be values[values.length] */
  inputType?: 'inside' | 'outside';
}

declare const GroupedInput: FC<GroupedInputProps>;

export default GroupedInput;
