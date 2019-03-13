import React, { useState } from 'react';
import MUITablePagination from '@material-ui/core/TablePagination';
import { paginationOptions } from './TablePropTypes';

const onChangeRowsPerPage = (setRowsPerPage, setPage) => event => {
  setRowsPerPage(event.target.value);
  setPage(0);
};

const onChangePage = setPage => (event, page) => {
  setPage(page);
};

const TablePagination = ({
  rowsPerPageOptions,
  rowsPerPage: rowsPerPageProp,
  page: pageProp,
  rowCount,
  pagination,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(
    rowsPerPageOptions.includes(rowsPerPageProp)
      ? rowsPerPageProp
      : rowsPerPageOptions[0]
  );
  const [page, setPage] = useState(pageProp);

  if (!pagination) return null;

  return (
    <MUITablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={onChangeRowsPerPage(setRowsPerPage, setPage)}
      page={page}
      onChangePage={onChangePage(setPage)}
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
