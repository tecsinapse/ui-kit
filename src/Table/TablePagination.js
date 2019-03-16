import React from 'react';
import MUITablePagination from '@material-ui/core/TablePagination';
import { paginationOptions } from './TablePropTypes';

const onChangeRowsPerPage = onChangePageProp => event => {
  onChangePageProp(event.target.value, 0);
};

const onChangePage = (onChangePageProp, rowsPerPage) => (event, page) => {
  onChangePageProp(rowsPerPage, page);
};

const TablePagination = ({
  rowsPerPageOptions,
  rowsPerPage,
  page,
  rowCount,
  pagination,
  onChangePage: onChangePageProp,
}) => {
  if (!pagination) return null;

  return (
    <MUITablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={onChangeRowsPerPage(onChangePageProp, rowsPerPage)}
      page={page}
      onChangePage={onChangePage(onChangePageProp, rowsPerPage)}
      count={rowCount}
    />
  );
};

TablePagination.defaultProps = {
  pagination: false,
  rowsPerPageOptions: [5, 15, 30],
  rowsPerPage: 15,
  page: 0,
  rowCount: null,
};

TablePagination.propTypes = paginationOptions;

export default TablePagination;
