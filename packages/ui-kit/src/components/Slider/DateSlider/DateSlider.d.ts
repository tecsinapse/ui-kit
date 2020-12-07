import { FC } from 'react';

export interface DateSliderProps {
  /** Range of dates to be displayed */
  range: Date[];
  /** Values to be changed or initial value */
  values: Date[];
  /** Function triggered on slider change */
  onChange: (value: unknown) => void;
  /** Disables the slider */
  disabled?: boolean;
  /** Label display mode */
  labelDisplay?: 'auto' | 'on' | 'off';
  /** Language code for date conversion */
  locale?: string;
  /** Array of week days from Sun to Sat */
  days?: string[];
  /** Change slider from interval to single */
  simple?: boolean;
}

declare const DateSlider: FC<DateSliderProps>;

export default DateSlider;
