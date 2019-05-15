import React from 'react';
import MUITablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { TableCell } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { paginationOptions } from './TablePropTypes';

const styles = makeStyles(theme => ({
  total: {
    color: lighten(theme.palette.text.primary, 0.54),
    width: '100%',
    textAlign: 'right',
  },
}));

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
  labelDisplayedRows,
  labelRowsPerPage,
  tableColumns,
}) => {
  const classes = styles();

  if (!pagination) {
    return (
      <TableCell colSpan={tableColumns.length}>
        <Typography variant="caption" className={classes.total}>
          Total: {rowCount}
        </Typography>
      </TableCell>
    );
  }

  return (
    <MUITablePagination
      style={{ width: '100%' }}
      labelDisplayedRows={labelDisplayedRows}
      labelRowsPerPage={labelRowsPerPage}
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
