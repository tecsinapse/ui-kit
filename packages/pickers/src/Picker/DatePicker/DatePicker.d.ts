import { FC, ReactNode } from 'react';
import { DateTime } from '@types/luxon';

export interface DatePickerProps {
  /** Current selected date */
  selectedDate?: Date | DateTime;
  /** Input id */
  id?: string;
  /** Input label */
  label?: string;
  /** Change event handler */
  onChange?: (value: Date) => void;
  /** Date format to be rendered */
  format?: string;
  /** Use keyboard picker */
  keyboardPicker?: boolean;
  /** Dates to be pointed on calendar */
  pointedDates?: Array<DateTime | Date>;
  /** Input variant style */
  inputVariant?: 'standard' | 'outlined' | 'filled';
  /** Custom component render */
  customTextFieldComponentInput?: ReactNode;
}

declare const DatePicker: FC<DatePickerProps>;

export default DatePicker;
