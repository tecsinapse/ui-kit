import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { resolveObj, isNotEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { tableStyles } from './tableStyle';
import TableRowFilter from './TableRowFilter';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';
import { toolbarOptionsTypes } from './TablePropTypes';

const initializeColumns = (tableColumns, tableOptions, actions) => {
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

const onChangeFilter = (
  data,
  setData,
  columns,
  onFilterData,
  setPage
) => () => {
  let filteredData = [...data];

  columns.forEach(column => {
    filteredData = filteredData.filter(row => {
      const valueField = resolveObj(column.field, row);

      if (!column.filterValue) return true;

      if (typeof valueField === 'object') {
        return true;
      }
      if (typeof valueField === 'string') {
        return valueField
          .toLowerCase()
          .includes(column.filterValue.toLowerCase());
      }
      return false;
    });
  });

  setPage(0);
  setData(filteredData);

  if (onFilterData) {
    onFilterData(filteredData);
  }
};

const onChangePage = (data, setPageData, setPage, setRowsPerPage) => (
  rowsPerPage,
  page
) => {
  setPage(page);
  setRowsPerPage(rowsPerPage);
  setPageData(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
};

const Table = props => {
  const {
    data: originalData,
    columns,
    onFilterData,
    options,
    selectedData,
    rowId,
    onSelectRow,
    actions,
    toolbarOptions,
    pagination,
    rowsPerPageOptions,
    rowsPerPage: rowsPerPageProp,
    page: pageProp,
    labelDisplayedRows,
    labelRowsPerPage,
  } = props;

  const classes = tableStyles();
  const [data, setData] = useState([...originalData]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(pageProp);
  const [rowsPerPage, setRowsPerPage] = useState(
    rowsPerPageOptions.includes(rowsPerPageProp)
      ? rowsPerPageProp
      : rowsPerPageOptions[0]
  );
  let rowCount = data.length;

  useEffect(() => {
    setPageData(
      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
    rowCount = data.length;
  }, [data]);

  const [selectedRows, setSelectedRows] = useState([...selectedData]);
  const [tableColumns] = useState(initializeColumns(columns, options, actions));
  const paginationOptions = {
    rowsPerPageOptions,
    rowsPerPage,
    page,
    rowCount,
    pagination,
    onChangePage: onChangePage(data, setPageData, setPage, setRowsPerPage),
    labelDisplayedRows,
    labelRowsPerPage,
    tableColumns,
  };

  const someColumnHasFilter = columns.some(
    ({ options: columnOptions = {} }) => columnOptions.filter
  );

  return (
    <div>
      <TableToolbar
        options={toolbarOptions}
        selectedRows={selectedRows}
        selection={options.selection}
      />
      <MUITable className={classes.table}>
        <TableHeader
          columns={tableColumns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          data={pageData}
          onSelectRow={onSelectRow}
          rowId={rowId}
        />
        <TableBody>
          <TableRowFilter
            rendered={someColumnHasFilter}
            columns={tableColumns}
            onChangeFilter={onChangeFilter(
              originalData,
              setData,
              tableColumns,
              onFilterData,
              setPage
            )}
          />
          <TableRows
            columns={tableColumns}
            data={pageData}
            rowId={rowId}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onSelectRow={onSelectRow}
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination {...paginationOptions} />
          </TableRow>
        </TableFooter>
      </MUITable>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  onFilterData: null,
  options: {},
  selectedData: [],
  onSelectRow: null,
  rowCount: null,
  actions: [],
  toolbarOptions: null,
  pagination: false,
  rowsPerPageOptions: [10, 20, 30],
  rowsPerPage: 10,
  page: 0,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: 'Rows per page:',
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string.isRequired,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  onFilterData: PropTypes.func,
  rowId: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selection: PropTypes.bool,
  }),
  selectedData: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  rowCount: PropTypes.number,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      tooltip: PropTypes.string,
      icon: PropTypes.object,
      onClick: PropTypes.func,
    })
  ),
  toolbarOptions: toolbarOptionsTypes,
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  labelDisplayedRows: PropTypes.func,
  labelRowsPerPage: PropTypes.string,
};

export default Table;
