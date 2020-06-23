import { isNotEmptyOrNull, resolveObj } from '@tecsinapse/es-utils/build';
import { isEmptyOrNull } from '@tecsinapse/es-utils';

export const INCLUDE_MATCH_CONST = 'INCLUDE';
export const EXACT_MATCH_CONST = 'EXACT';

export const normalizeString = str =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;

export const resolveData = (field, data) =>
  stringifyIfObject(resolveObj(field, data));

export const exportToCSV = (fileName, columns, data, delimeter = ';') => {
  let fileNameWithExt = fileName;

  if (!fileNameWithExt.endsWith('.csv')) {
    fileNameWithExt = fileNameWithExt.concat('.csv');
  }

  const exportedColumns = columns.filter(
    ({ options = {} }) => options.export === undefined || options.export
  );

  const dataToExport = data.map(d =>
    exportedColumns
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

    return { ...prevFilters, ...newFilters };
  });
};

export const onChangeSortFilter = setFilters => (field, defaultSort) => {
  setFilters(prevFilters => {
    const newFilters = {};

    if (field !== prevFilters.sortField) {
      // changing the sort column
      newFilters.sortField = field;
      newFilters.ascending = defaultSort
        ? defaultSort === 'ASC'
        : prevFilters.ascending;
    } else {
      // same sort column, change only order
      newFilters.ascending = !prevFilters.ascending;
    }

    return { ...prevFilters, ...newFilters };
  });
};

export const onChangeStartStopIndex = setFilters => ({
  startIndex,
  stopIndex,
}) => {
  let loadedResolver;
  const loadedPromise = new Promise(resolve => {
    loadedResolver = resolve;
  });

  setFilters(prevFilters => ({
    ...prevFilters,
    ...{ startIndex, stopIndex, loadedResolver },
    page: Math.round(startIndex / prevFilters.rowsPerPage),
  }));

  return loadedPromise;
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
  toolbarOptions = {},
  sortFuncInit
) => {
  const { advancedFilters: advancedFiltersProp } = toolbarOptions;
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
    ascending: true,
    sortField: '',
    sortFunc: sortFuncInit,

    // TODO: Remove page/rowsPerPage logic to start stop index.
    // they have the same meaning, but the start/stop is used by
    // react-virtualized being easier to make as default than page logic
    startIndex: 0,
    stopIndex: rowsPerPage,
    loadedResolver: null,
  };
};

export const applyHeaderFilters = (
  data,
  headerFilters,
  ascending,
  sortField,
  sortFunc
) => {
  let filteredSortData = [...data];

  // Filter
  Object.keys(headerFilters).forEach(field => {
    const { value: filterValue, matchType } = headerFilters[field];

    filteredSortData = filteredSortData.filter(row => {
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

        return normalizeString(valueField).includes(
          normalizeString(filterValue)
        );
      }

      return false;
    });
  });

  // Sort when it has clicked in a sorted column
  if (sortField) {
    filteredSortData = sortFunc(filteredSortData, sortField, ascending);
  }

  return filteredSortData;
};

export const initializeSortFunc = sortFuncProp => {
  if (sortFuncProp !== undefined) {
    return sortFuncProp;
  }

  return (copyData, field, ascending) => {
    const sortedArray = copyData.sort((obj1, obj2) => {
      const value1 = resolveData(field, obj1);
      const value2 = resolveData(field, obj2);

      if (value1 < value2) {
        return -1;
      }

      if (value1 > value2) {
        return 1;
      }

      return 0;
    });

    if (ascending) {
      return sortedArray;
    }
    sortedArray.reverse();

    return sortedArray;
  };
};

const isRowSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

export const handleRowClick = (
  rowData,
  hasSelection,
  onSelectRow,
  onRowClick,
  selectedRows,
  setSelectedRows,
  rowId
) => event => {
  if (onRowClick) {
    onRowClick(rowData);

    return;
  }

  if (!hasSelection) {
    return;
  }

  let checked = false;

  if (isEmptyOrNull(selectedRows)) {
    const newSelectedRows = [rowData];

    setSelectedRows(newSelectedRows);
    checked = true;

    if (onSelectRow) {
      onSelectRow(newSelectedRows, rowData, checked);
    }
  } else {
    let newSelectedRows = [];

    if (isRowSelected(selectedRows, rowData, rowId)) {
      newSelectedRows = selectedRows.filter(
        selectedRow => rowId(selectedRow) !== rowId(rowData)
      );
    } else {
      newSelectedRows = [...selectedRows, rowData];
      checked = true;
    }
    setSelectedRows(newSelectedRows);

    if (onSelectRow) {
      onSelectRow(newSelectedRows, rowData, checked);
    }
  }
};
