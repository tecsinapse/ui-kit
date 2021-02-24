import LuxonUtils from '@date-io/luxon';
import DataWrapper from './DataWrapper';

export class CustomLuxonUtils extends LuxonUtils {
  dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  wrapper;

  constructor() {
    super();
    this.wrapper = new DataWrapper();
    this.wrapper.setStartDay('Dom');
  }

  getWeekdays() {
    return this.wrapper.processWeekDayOrder();
  }

  getWeekArray(date) {
    const { index } = this.wrapper.startDay;
    const endDate = date
      .endOf('month')
      .plus({ days: index !== 0 ? this.dayNames.length + 1 - index : 1 })
      .endOf('week');
    const startDate = date
      .startOf('month')
      .startOf('week')
      .minus({ days: index !== 0 ? this.dayNames.length + 1 - index : 1 });

    const { days } = endDate.diff(startDate, 'days').toObject();

    const weeks = [];

    new Array(Math.round(days))
      .fill(0)
      .map((_, i) => i)
      .map(day => startDate.plus({ days: day }))
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);

          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks.filter(w => w.some(d => d.month === date.month));
  }
}
