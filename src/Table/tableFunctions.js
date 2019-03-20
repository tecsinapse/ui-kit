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

  const csvData = dataToExport.join('\n');
  const csvFile = window.URL.createObjectURL(
    new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  );

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(csvFile, fileName);
  } else {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = csvFile;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.style.visibility = 'hidden';
    document.body.appendChild(hiddenElement);
    hiddenElement.click();
    document.body.removeChild(hiddenElement);
  }
};
