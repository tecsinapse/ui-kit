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
}
