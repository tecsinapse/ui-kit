import { FC, ReactNode } from 'react';
import { DateTime } from '@types/luxon';
import { BaseDatePickerProps } from '@material-ui/pickers';

export type SelectedDateTime = Date | DateTime | null;

export interface DatePickerProps extends BaseDatePickerProps {
  /** Current selected date */
  selectedDate?: SelectedDateTime;
  /** Input id */
  id?: string;
  /** Input name */
  name?: string;
  /** Input label */
  label?: string;
  /** Change event handler */
  onChange?: (value: SelectedDateTime) => void;
  /** Date format to be rendered */
  format?: string;
  /** Use keyboard picker */
  keyboardPicker?: boolean;
  /** Dates to be pointed on calendar */
  pointedDates?: DateTime[] | Date[];
  /** Input variant style */
  inputVariant?: 'standard' | 'outlined' | 'filled';
  /** Custom component render */
  customTextFieldComponentInput?: ReactNode;
  /** Pick the entire week */
  weekly?: boolean;
  /** Button fill div/screen width */
  fullWidth?: boolean;
  /** Disable the input */
  disabled?: boolean;
}

declare const DatePicker: FC<DatePickerProps>;

export default DatePicker;
