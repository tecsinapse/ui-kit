import DateFnsUtils from '@date-io/date-fns';
import DataWrapper from './DataWrapper';

export class CustomDateFnsUtils extends DateFnsUtils {
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
}
