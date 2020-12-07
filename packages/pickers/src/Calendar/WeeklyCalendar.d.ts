import { FC } from 'react';
import { DateTime } from 'luxon';

export interface WeeklyCalendarProps {
  /** Day change event handler */
  onDayChange?: (day: DateTime) => void;
  /** Week change event handler */
  onWeekChange?: (week: DateTime[] | Date[]) => void;
  /** Initial date */
  currentDate: Date | DateTime;
  /** Locale language code to format date */
  locale?: string;
}

declare const WeeklyCalendar: FC<WeeklyCalendarProps>;

export default WeeklyCalendar;
