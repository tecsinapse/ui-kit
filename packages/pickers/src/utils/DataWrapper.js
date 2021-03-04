export default class DataWrapper {
  default = [
    {
      index: 0,
      name: 'Dom',
      dayName: 'D',
    },
    {
      index: 1,
      name: 'Seg',
      dayName: 'S',
    },
    {
      index: 2,
      name: 'Ter',
      dayName: 'T',
    },
    {
      index: 3,
      name: 'Qua',
      dayName: 'Q',
    },
    {
      index: 4,
      name: 'Qui',
      dayName: 'Q',
    },
    {
      index: 5,
      name: 'Sex',
      dayName: 'S',
    },
    {
      index: 6,
      name: 'Sab',
      dayName: 'S',
    },
  ];

  dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  processedDayNames = [];

  startDay = {};

  setStartDay(dayName) {
    const x = this.default.filter(day => dayName === day.name);

    this.startDay = { x };
  }

  processWeekDayOrder() {
    const days = [...this.dayNames];
    const remainingDays = days.splice(0, this.startDay.index);

    this.processedDayNames = days.concat(remainingDays);

    return this.processedDayNames;
  }
}
