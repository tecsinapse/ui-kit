export function makeJSDateObject(date) {
  if (date && typeof date.toJSDate === 'function') {
    return date.toJSDate();
  }

  if (date instanceof Date) {
    return new Date(date.getTime());
  }

  throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}
