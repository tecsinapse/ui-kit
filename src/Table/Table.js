import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { resolveObj, isNotEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import TableFooter from '@material-ui/core/TableFooter';
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

const onChangeFilter = (data, setRowData, columns, onFilterData) => () => {
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

  setRowData(filteredData);
  onFilterData(filteredData);
};

const Table = props => {
  const {
    data,
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
    rowsPerPage,
    page,
  } = props;

  let { rowCount } = props;
  const paginationOptions = {
    rowsPerPageOptions,
    rowsPerPage,
    page,
    rowCount,
    pagination,
  };
  const classes = tableStyles();
  const [rowData, setRowData] = useState([...data]);
  const [selectedRows, setSelectedRows] = useState([...selectedData]);
  const [tableColumns] = useState(initializeColumns(columns, options, actions));
  rowCount = rowCount || data.length;

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
          rowCount={rowCount}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          data={rowData}
          onSelectRow={onSelectRow}
        />
        <TableBody>
          <TableRowFilter
            rendered={someColumnHasFilter}
            columns={tableColumns}
            onChangeFilter={onChangeFilter(
              data,
              setRowData,
              tableColumns,
              onFilterData
            )}
          />
          <TableRows
            columns={tableColumns}
            data={rowData}
            rowId={rowId}
            rowCount={rowCount}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onSelectRow={onSelectRow}
          />
        </TableBody>
        <TableFooter>
          <TablePagination {...paginationOptions} />
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
  rowsPerPageOptions: [5, 15, 30],
  rowsPerPage: 15,
  page: 0,
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
};

export default Table;
