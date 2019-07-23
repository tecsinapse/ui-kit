import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {
  isEmptyOrNull,
  isNotEmptyOrNull,
} from '@tecsinapse/es-utils/core/object';
import { makeStyles } from '@material-ui/styles';

const headerStyles = makeStyles(theme => ({
  selectionColumn: {
    width: '7%',
  },
}));

const getSelectedRowsPage = (data, selectedRows, rowId) =>
  isEmptyOrNull(selectedRows)
    ? []
    : selectedRows.filter(selected =>
        data.some(rowData => rowId(rowData) === rowId(selected))
      );

const selectAll = (
  data,
  selectedRows,
  setSelectedRows,
  onSelectRow,
  rowId
) => () => {
  const selectedRowsPage = getSelectedRowsPage(data, selectedRows, rowId);
  let newSelectedRows = isEmptyOrNull(selectedRows)
    ? []
    : selectedRows.filter(selected =>
        data.every(rowData => rowId(rowData) !== rowId(selected))
      );
  let checked = false;
  if (
    isEmptyOrNull(selectedRowsPage) ||
    selectedRowsPage.length !== data.length
  ) {
    newSelectedRows = newSelectedRows.concat(data);
    checked = true;
  }

  setSelectedRows(newSelectedRows);
  if (onSelectRow) {
    onSelectRow(newSelectedRows, null, checked);
  }
};

const convertColumnToTableCell = (
  { field, title, options = {}, selection },
  selectedRows,
  setSelectedRows,
  data,
  onSelectRow,
  classes,
  rowId
) => {
  const { visible = true } = options;

  if (!visible) {
    return null;
  }

  if (selection) {
    const selectedRowsPage = getSelectedRowsPage(data, selectedRows, rowId);
    const indeterminate =
      isNotEmptyOrNull(selectedRowsPage) &&
      selectedRowsPage.length !== data.length;
    const checked =
      isNotEmptyOrNull(selectedRowsPage) &&
      selectedRowsPage.length === data.length;
    return (
      <TableCell
        key={field}
        padding="checkbox"
        className={classes.selectionColumn}
      >
        <Checkbox
          indeterminate={indeterminate}
          checked={checked}
          onClick={selectAll(
            data,
            selectedRows,
            setSelectedRows,
            onSelectRow,
            rowId
          )}
        />
      </TableCell>
    );
  }
  return (
    <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
      {title}
    </TableCell>
  );
};

const TableHeader = ({
  columns,
  selectedRows,
  setSelectedRows,
  data,
  onSelectRow,
  rowId,
  tableHeaderHide,
}) => {
  const classes = headerStyles();

  if (tableHeaderHide) {
    return null;
  }

  let tableCells = null;

  if (columns && columns.length > 0) {
    tableCells = columns.map(column =>
      convertColumnToTableCell(
        column,
        selectedRows,
        setSelectedRows,
        data,
        onSelectRow,
        classes,
        rowId
      )
    );
  }

  return (
    <TableHead>
      <TableRow>{tableCells}</TableRow>
    </TableHead>
  );
};

TableHeader.defaultProps = {
  selectedRows: null,
  onSelectRow: null,
  setSelectedRows: null,
  tableHeaderHide: false,
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  setSelectedRows: PropTypes.func,
  tableHeaderHide: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowId: PropTypes.func.isRequired,
};

export default TableHeader;
