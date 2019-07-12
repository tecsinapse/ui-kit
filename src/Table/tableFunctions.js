import { isNotEmptyOrNull, resolveObj } from '@tecsinapse/es-utils/core/object';

export const INCLUDE_MATCH_CONST = 'INCLUDE';
export const EXACT_MATCH_CONST = 'EXACT';

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;

export const resolveData = (field, data) =>
  stringifyIfObject(resolveObj(field, data));

export const exportToCSV = (fileName, columns, data, delimeter = ';') => {
  let fileNameWithExt = fileName;

  if (!fileNameWithExt.endsWith('.csv')) {
    fileNameWithExt = fileNameWithExt.concat('.csv');
  }

  const exportedColumns = columns.filter(({ options = {} }) => options.export);

  const dataToExport = data.map(d =>
    exportedColumns
      .filter(({ options = {} }) => options.export)
      .map(c => (c.customRender ? c.customRender(d) : resolveData(c.field, d)))
      .join(delimeter)
  );
  dataToExport.splice(0, 0, exportedColumns.map(c => c.title).join(delimeter));

  const csvData = dataToExport.join('\n');
  const csvFile = window.URL.createObjectURL(
    new Blob(['\ufeff', csvData], { type: 'text/csv;charset=utf-8;' })
  );

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(csvFile, fileNameWithExt);
  } else {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = csvFile;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileNameWithExt;
    hiddenElement.style.visibility = 'hidden';
    document.body.appendChild(hiddenElement);
    hiddenElement.click();
    document.body.removeChild(hiddenElement);
  }
};

export const onChangeHeaderFilter = setFilters => headerFilters => {
  setFilters(prevFilters => {
    const newFilters = { page: 0 };
    newFilters.headerFilters = { ...headerFilters };
    const mergedFilters = { ...prevFilters, ...newFilters };
    return mergedFilters;
  });
};

export const onChangePage = setFilters => (rowsPerPage, page) => {
  setFilters(prevFilters => ({ ...prevFilters, ...{ page, rowsPerPage } }));
};

export const initializeColumns = (tableColumns, tableOptions, actions) => {
  const columns = [...tableColumns];
  if (tableOptions.selection) {
    columns.splice(0, 0, {
      field: 'checkbox-header',
      selection: true,
    });
  }

  const hasActions = isNotEmptyOrNull(actions);
  if (hasActions) {
    columns.push({
      field: 'actions',
      actions,
    });
  }
  return columns;
};

export const isRemoteData = data => typeof data === 'function';

export const initializeFilters = (
  pagination,
  rowsPerPageOptions,
  rowsPerPageProp,
  pageProp,
  { advancedFilters: advancedFiltersProp }
) => {
  const headerFilters = {};
  const advancedFilters = {};
  let rowsPerPage = null;

  if (pagination) {
    rowsPerPage = rowsPerPageOptions.includes(rowsPerPageProp)
      ? rowsPerPageProp
      : rowsPerPageOptions[0];
  }

  if (advancedFiltersProp) {
    advancedFiltersProp.filters.forEach(
      ({ type, value: filterValue, name }) => {
        let value = '';

        if (filterValue) {
          value = filterValue;
        } else if (type === 'multi-select') {
          value = [];
        } else if (type === 'checkbox') {
          value = false;
        }

        advancedFilters[name] = value;
      }
    );
  }

  return {
    headerFilters,
    advancedFilters,
    page: pageProp,
    rowsPerPage,
  };
};

export const applyHeaderFilters = (data, filters) => {
  const { headerFilters } = filters;
  let filteredData = [...data];

  Object.keys(headerFilters).forEach(field => {
    const { value: filterValue, matchType } = headerFilters[field];

    filteredData = filteredData.filter(row => {
      const valueField = resolveObj(field, row);

      if (!filterValue) {
        return true;
      }

      if (typeof valueField === 'object') {
        return true;
      }
      if (typeof valueField === 'string') {
        if (matchType === EXACT_MATCH_CONST) {
          return valueField === filterValue;
        }
        return valueField.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    });
  });

  return filteredData;
};
