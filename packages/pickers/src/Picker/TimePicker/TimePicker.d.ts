import { FC } from 'react';
import { DateTime } from 'luxon';

export interface TimePickerProps {
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
}

declare const TimePicker: FC<TimePickerProps>;

export default TimePicker;
