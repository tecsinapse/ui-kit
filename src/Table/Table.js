import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import { useWindowSize } from '@tecsinapse/ui-kit/build/ThemeProvider';
import { TableCell } from '@material-ui/core';
import { styleDivContainer, tableStyles } from './utils/tableStyle';
import RowFilters from './Rows/RowFilters/RowFilters';
import { Mobile } from './Mobile/Mobile';
import Header from './Rows/Header/Header';
import Rows from './Rows/Rows';
import Toolbar from './Toolbar/Toolbar';
import Pagination from './Pagination/Pagination';
import { toolbarOptionsTypes } from './utils/propTypes';
import { Loading } from './Loading';

import {
  initializeColumns,
  initializeFilters,
  initializeSortFunc,
  isRemoteData,
  onChangeHeaderFilter,
  onChangePage,
  onChangeSortFilter,
  onChangeStartStopIndex,
} from './utils/tableFunctions';
import {
  useInitialCheckboxData,
  useInitialData,
  useUpdateDataProp,
  useUpdateDataRemote,
  useUpdatePageData,
} from './utils/tableHooks';
import Exporter from './Exporter/Exporter';

const TableComponent = props => {
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
    sortFunc,
    variant,
    labelShowLess,
    labelShowMore,
    empytStateComponent,
    hideSelectFilterLabel,
    customAdvancedFilters,
    customRow,
  } = props;
  const classes = tableStyles(useWindowSize()[1]);
  const [mobile, setMobile] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(() =>
    initializeFilters(
      pagination,
      rowsPerPageOptions,
      rowsPerPageProp,
      pageProp,
      toolbarOptions,
      initializeSortFunc(sortFunc)
    )
  );

  const tableColumns = initializeColumns(columns, options, actions);
  useInitialData(originalData, setData);
  useInitialCheckboxData(selectedData, setSelectedRows);

  // Only one update data is executed, depends on type of originalData
  useUpdateDataRemote(
    originalData,
    setLoading,
    setData,
    filters,
    setRowCount,
    mobile
  );
  useUpdateDataProp(originalData, setLoading, setData, filters, setRowCount);

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

  // Update the device
  const matches = useMediaQuery(useTheme().breakpoints.down('xs'));
  if (variant === 'auto') {
    if (matches && !mobile) {
      setMobile(true);
    } else if (!matches && mobile) {
      setMobile(false);
    }
  } else if (variant === 'mobile' && !mobile) {
    setMobile(true);
  } else if (mobile) {
    setMobile(false);
  }

  const style = !mobile ? styleDivContainer : {};

  return (
    <div className={propClasses.root} id={id} style={style}>
      <Loading loading={loading} />
      <Toolbar
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
        mobile={mobile}
        customAdvancedFilters={customAdvancedFilters}
      />
      {mobile ? (
        <div className={propClasses.rootMobile || classes.rootMobile}>
          <Mobile
            columns={columns}
            rowId={rowId}
            onRowClick={onRowClick}
            actions={actions}
            rowCount={rowCount}
            data={data}
            onChangeStartStopIndex={onChangeStartStopIndex(setFilters)}
            labelShowLess={labelShowLess}
            labelShowMore={labelShowMore}
            page={filters.page}
            tableHeaderHide={tableHeaderHide}
            empytStateComponent={empytStateComponent}
          />
        </div>
      ) : (
        <>
          <MUITable className={classes.table}>
            <Header
              columns={tableColumns}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              data={pageData}
              onSelectRow={onSelectRow}
              rowId={rowId}
              tableHeaderHide={tableHeaderHide}
              filters={filters}
              onChangeSortFilter={onChangeSortFilter(setFilters)}
            />
            <TableBody>
              <RowFilters
                rendered={someColumnHasFilter}
                columns={tableColumns}
                data={originalData}
                onChangeFilter={onChangeHeaderFilter(setFilters)}
                hideSelectFilterLabel={hideSelectFilterLabel}
              />
              <Rows
                columns={tableColumns}
                forceCollapseActions={forceCollapseActions}
                verticalActions={verticalActions}
                data={pageData}
                rowId={rowId}
                onRowClick={onRowClick}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                onSelectRow={onSelectRow}
                empytStateComponent={empytStateComponent}
                customRow={customRow}
              />
            </TableBody>
            <TableFooter>
              <TableRow>
                {exportOptions?.position === 'footer' && (
                  <TableCell>
                    <Exporter
                      {...exportOptions}
                      data={data}
                      columns={columns}
                      filters={filters}
                      setLoading={setLoading}
                      rowCount={rowCount}
                    />
                  </TableCell>
                )}
                <Pagination {...paginationOptions} />
              </TableRow>
            </TableFooter>
          </MUITable>
        </>
      )}
    </div>
  );
};

TableComponent.defaultProps = {
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
  toolbarOptions: {},
  pagination: false,
  rowsPerPageOptions: [10, 20, 30],
  rowsPerPage: null,
  page: 0,
  exportOptions: {
    position: 'header',
  },
  id: null,
  classes: {},
  variant: 'auto',
  labelShowLess: 'MOSTRAR MENOS',
  labelShowMore: 'MOSTRAR MAIS',
  empytStateComponent: undefined,
  hideSelectFilterLabel: false,
  customAdvancedFilters: undefined,
  customRow: undefined,
};

TableComponent.propTypes = {
  /** Table columns options */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string.isRequired,
      options: PropTypes.shape({
        filter: PropTypes.bool,
        sort: PropTypes.bool,
      }),
      customRender: PropTypes.func,
    })
  ).isRequired,
  /** Data object or function loader */
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func,
  ]),
  /** On data filter funtion handler */
  onFilterData: PropTypes.func,
  /** Set vertical actions table */
  verticalActions: PropTypes.bool,
  /** Row identifier */
  rowId: PropTypes.func.isRequired,
  /** Set table selectable rows */
  options: PropTypes.shape({
    selection: PropTypes.bool,
  }),
  /** Object containing selected rows */
  selectedData: PropTypes.arrayOf(PropTypes.object),
  /** Row selection handler */
  onSelectRow: PropTypes.func,
  /** Row click handler */
  onRowClick: PropTypes.func,
  id: PropTypes.string,
  /** Configure table actions */
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
  /** Table toolbar options. Check accepted attributes [here](https://github.com/tecsinapse/table/blob/master/src/Table/TablePropTypes.js#L3) */
  toolbarOptions: toolbarOptionsTypes,
  /** Enable table pagination */
  pagination: PropTypes.bool,
  /** Hide table toolbar */
  tableToolbarHide: PropTypes.bool,
  /** Hide table header */
  tableHeaderHide: PropTypes.bool,
  /** Number of rows per page available to be selected */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  /** Rows to be rendered per page if paginated */
  rowsPerPage: PropTypes.number,
  /** Current page number */
  page: PropTypes.number,
  /** CSS classes applied to root div */
  classes: PropTypes.shape({
    root: PropTypes.string,
    rootMobile: PropTypes.string,
  }),
  /** Set options for exporting table. If custom `type` is provided, you have to set `exportFunc` and `label` */
  exportOptions: PropTypes.shape({
    exportFileName: PropTypes.string,
    position: PropTypes.oneOf(['header', 'footer']),
    exportTypes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['csv', 'custom']),
        label: PropTypes.string,
        delimeter: PropTypes.string,
        exportFunc: PropTypes.func,
      })
    ),
  }),
  /** Set table variant view */
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  /** Label for mobile show less button */
  labelShowLess: PropTypes.string,
  /** Label for mobile show more button */
  labelShowMore: PropTypes.string,
  /** Empty state component to display */
  empytStateComponent: PropTypes.node,
  /** Hide floating label of select filter */
  hideSelectFilterLabel: PropTypes.bool,
  /** Replace table advanced filters to your own */
  customAdvancedFilters: PropTypes.shape({
    applyFilters: PropTypes.func,
    filters: PropTypes.node,
  }),
  /** Provides custom row render. See examples for more detailed use cases. */
  customRow: PropTypes.func,
};

export const Table = TableComponent;
export default Table;
