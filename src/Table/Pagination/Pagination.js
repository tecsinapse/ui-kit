import React, { useContext } from 'react';
import MUITablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { TableCell } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { paginationOptions } from '../utils/propTypes';

const styles = makeStyles((theme) => ({
  total: {
    color: lighten(theme.palette.text.primary, 0.54),
    width: '100%',
    textAlign: 'right',
  },
}));

const onChangeRowsPerPage = (onChangePageProp) => (event) => {
  onChangePageProp(event.target.value, 0);
};

const onChangePage = (onChangePageProp, rowsPerPage) => (event, page) => {
  onChangePageProp(rowsPerPage, page);
};

const Pagination = ({
  rowsPerPageOptions,
  rowsPerPage,
  page,
  rowCount,
  pagination,
  onChangePage: onChangePageProp,
  tableColumns,
}) => {
  const classes = styles();
  const {
    Table: { labelRowsPerPage, labelDisplayedRows },
  } = useContext(LocaleContext);

  if (!pagination) {
    const align = { textAlign: 'end' };
    return (
      <TableCell colSpan={tableColumns.length} style={align}>
        <Typography variant="caption" className={classes.total}>
          Total: {rowCount}
        </Typography>
      </TableCell>
    );
  }

  return (
    <MUITablePagination
      labelDisplayedRows={labelDisplayedRows}
      rowsPerPageOptions={rowsPerPageOptions}
      labelRowsPerPage={labelRowsPerPage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={onChangeRowsPerPage(onChangePageProp, rowsPerPage)}
      page={page}
      onChangePage={onChangePage(onChangePageProp, rowsPerPage)}
      count={rowCount}
    />
  );
};

Pagination.defaultProps = {
  pagination: false,
  rowsPerPageOptions: [5, 15, 30],
  rowsPerPage: 15,
  page: 0,
  rowCount: null,
};

Pagination.propTypes = paginationOptions;

export default Pagination;
