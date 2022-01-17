import { add } from 'date-fns';

export const WEEK_DAYS = 7;

export const fillWeekDays = (startDate, days) => {
  const weekDaysTemp = [];

  for (let i = 0; i < days; i++) {
    const day = i === 0 ? startDate : add(startDate, { days: i });

    weekDaysTemp.push(day);
  }

  return weekDaysTemp;
};
