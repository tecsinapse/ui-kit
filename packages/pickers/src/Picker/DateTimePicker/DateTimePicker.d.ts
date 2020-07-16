import { FC } from 'react';
import { DateTime } from '@types/luxon';

export interface DateTimePickerProps {
  /** Current selected date and time */
  selectedDateTime?: Date | DateTime;
  /** Input id */
  id?: string;
  /** Input label */
  label?: string;
  /** Change event handler */
  onChange?: (value: Date) => void;
  /** Date and time format to be rendered */
  format?: string;
  /** Use keyboard picker */
  keyboardPicker?: boolean;
  /** Dates pointed on calendar */
  pointedDates?: Array<DateTime | Date>;
  /** Input variant selector */
  inputVariant?: 'standard' | 'outlined' | 'filled';
}

declare const DateTimePicker: FC<DateTimePickerProps>;

export default DateTimePicker;
