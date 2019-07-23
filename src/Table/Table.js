import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { tableStyles } from './tableStyle';
import TableRowFilter from './TableRowFilter';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import TableToolbar from './TableToolbar';
import TablePagination from './TablePagination';
import { toolbarOptionsTypes } from './TablePropTypes';
import TableLoading from './TableLoading';
import {
  initializeColumns,
  initializeFilters,
  isRemoteData,
  onChangeHeaderFilter,
  onChangePage,
} from './tableFunctions';
import {
  useInitialCheckboxData,
  useInitialData,
  useUpdateData,
  useUpdatePageData,
} from './tableHooks';

const Table = props => {
  const {
    data: originalData,
    columns,
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
    exportOptions,
    classes: propClasses,
    forceCollapseActions,
    verticalActions,
    onRowClick,
    tableToolbarHide,
    tableHeaderHide,
    id,
  } = props;

  const classes = tableStyles();
  const [rowCount, setRowCount] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableColumns] = useState(initializeColumns(columns, options, actions));
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(() =>
    initializeFilters(
      pagination,
      rowsPerPageOptions,
      rowsPerPageProp,
      pageProp,
      toolbarOptions || {}
    )
  );

  useInitialData(originalData, setData);
  useInitialCheckboxData(selectedData, setSelectedRows);
  useUpdateData(originalData, setLoading, setData, filters, setRowCount);
  useUpdatePageData(isRemoteData(originalData), data, setPageData, filters);

  const paginationOptions = {
    rowsPerPageOptions,
    rowsPerPage: filters.rowsPerPage,
    page: filters.page,
    rowCount,
    pagination,
    onChangePage: onChangePage(setFilters),
    tableColumns,
  };

  const someColumnHasFilter = columns.some(
    ({ options: columnOptions = {} }) => columnOptions.filter
  );

  return (
    <div className={propClasses.root} id={id}>
      <TableLoading loading={loading} />
      <TableToolbar
        options={toolbarOptions}
        selectedRows={selectedRows}
        selection={options.selection}
        exportOptions={exportOptions}
        data={isRemoteData(originalData) ? originalData : data}
        filters={filters}
        setFilters={setFilters}
        columns={columns}
        setLoading={setLoading}
        rowCount={rowCount}
        tableToolbarHide={tableToolbarHide}
      />
      <MUITable className={classes.table}>
        <TableHeader
          columns={tableColumns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          data={pageData}
          onSelectRow={onSelectRow}
          rowId={rowId}
          tableHeaderHide={tableHeaderHide}
        />
        <TableBody>
          <TableRowFilter
            rendered={someColumnHasFilter}
            columns={tableColumns}
            data={originalData}
            onChangeFilter={onChangeHeaderFilter(setFilters)}
          />
          <TableRows
            columns={tableColumns}
            forceCollapseActions={forceCollapseActions}
            verticalActions={verticalActions}
            data={pageData}
            rowId={rowId}
            onRowClick={onRowClick}
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
  onRowClick: null,
  tableToolbarHide: false,
  tableHeaderHide: false,
  actions: [],
  verticalActions: false,
  toolbarOptions: null,
  pagination: false,
  rowsPerPageOptions: [10, 20, 30],
  rowsPerPage: null,
  page: 0,
  exportOptions: null,
  id: null,
  classes: {},
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string.isRequired,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
      customRender: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func,
  ]),
  onFilterData: PropTypes.func,
  verticalActions: PropTypes.bool,
  rowId: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selection: PropTypes.bool,
  }),
  selectedData: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  onRowClick: PropTypes.func,
  id: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      tooltip: PropTypes.string,
      icon: PropTypes.object,
      onClick: PropTypes.func,
      visible: PropTypes.func,
      labelColor: PropTypes.string,
      label: PropTypes.string,
      bottomDivider: PropTypes.bool,
    })
  ),
  toolbarOptions: toolbarOptionsTypes,
  pagination: PropTypes.bool,
  tableToolbarHide: PropTypes.bool,
  tableHeaderHide: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  exportOptions: PropTypes.shape({
    exportFileName: PropTypes.string,
    exportTypes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['csv']),
        label: PropTypes.string,
        delimeter: PropTypes.string,
      })
    ),
  }),
};

export default Table;
