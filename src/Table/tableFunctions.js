import { resolveObj } from '@tecsinapse/es-utils/core/object';

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;

export const resolveData = (field, data) =>
  stringifyIfObject(resolveObj(field, data));

export const exportToCSV = (fileName, columns, data, delimeter = ';') => {
  const dataToExport = data.map(d =>
    columns.map(c => resolveData(c.field, d)).join(delimeter)
  );
  dataToExport.splice(0, 0, columns.map(c => c.title).join(delimeter));

  const hiddenElement = document.createElement('a');
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(
    dataToExport.join('\n')
  )}`;
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();
};
