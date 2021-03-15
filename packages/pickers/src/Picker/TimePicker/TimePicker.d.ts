import { FC } from 'react';
import { DateTime } from 'luxon';
import { BaseTimePickerProps } from '@material-ui/pickers';

export interface TimePickerProps extends BaseTimePickerProps {
  /** Current selected time */
  selectedTime: Date | DateTime;
  /** Input id */
  id?: string;
  /** Input label */
  label?: string;
  /** Change event handler */
  onChange?: (value: Date) => void;
  /** Time format to be rendered */
  format?: string;
  /** Input variant selector */
  inputVariant?: 'standard' | 'outlined' | 'filled';
  /** Button fill div/screen width */
  fullWidth?: boolean;
  /** Disable the input */
  disabled?: boolean;
}

declare const TimePicker: FC<TimePickerProps>;

export default TimePicker;
