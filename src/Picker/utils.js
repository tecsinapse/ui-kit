// TODO: Add mais libs para dar facilidade de uso

export function makeJSDateObject(date) {
  // if (date instanceof dayjs) {
  //   return (Dayjs).clone().toDate();
  // }

  // if (moment.isMoment(date)) {
  //   return (date as Moment).clone().toDate();
  // }

  if (date && typeof date.toJSDate === 'function') {
    return date.toJSDate();
  }

  if (date instanceof Date) {
    return new Date(date.getTime());
  }

  throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}
