import { FC } from 'react';
import { DateTime } from '@types/luxon';
import { BaseDateTimePickerProps } from '@material-ui/pickers';

export interface DateTimePickerProps extends BaseDateTimePickerProps {
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
  pointedDates?: DateTime[] | Date[];
  /** Input variant selector */
  inputVariant?: 'standard' | 'outlined' | 'filled';
  /** Button fill div/screen width */
  fullWidth?: boolean;
  /** Disable the input */
  disabled?: boolean;
}

declare const DateTimePicker: FC<DateTimePickerProps>;

export default DateTimePicker;
