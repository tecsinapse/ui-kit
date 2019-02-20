import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {
  isNotEmptyOrNull,
  isEmptyOrNull,
} from '@tecsinapse/es-utils/core/object';
import { makeStyles } from '@material-ui/styles';

const headerStyles = makeStyles(theme => ({
  selectionColumn: {
    width: '7%',
  },
}));

const selectAll = (data, selectedRows, setSelectedRows, onSelectRow) => () => {
  let newSelectedRows = [];
  let checked = false;
  if (isEmptyOrNull(selectedRows) || selectedRows.length !== data.length) {
    newSelectedRows = [...data];
    checked = true;
  }

  setSelectedRows(newSelectedRows);
  if (onSelectRow) {
    onSelectRow(newSelectedRows, null, checked);
  }
};

const convertColumnToTableCell = (
  { field, title, options = {}, selection },
  rowCount,
  selectedRows,
  setSelectedRows,
  data,
  onSelectRow,
  classes
) => {
  if (selection) {
    const indeterminate =
      isNotEmptyOrNull(selectedRows) && selectedRows.length !== rowCount;
    const checked =
      isNotEmptyOrNull(selectedRows) && selectedRows.length === rowCount;
    return (
      <TableCell
        key={field}
        padding="checkbox"
        className={classes.selectionColumn}
      >
        <Checkbox
          indeterminate={indeterminate}
          checked={checked}
          onClick={selectAll(data, selectedRows, setSelectedRows, onSelectRow)}
        />
      </TableCell>
    );
  }
  return (
    <TableCell align={options.numeric ? 'right' : 'left'}>{title}</TableCell>
  );
};

const TableHeader = ({
  columns,
  rowCount,
  selectedRows,
  setSelectedRows,
  data,
  onSelectRow,
}) => {
  let tableCells = null;
  const classes = headerStyles();

  if (columns && columns.length > 0) {
    tableCells = columns.map(column =>
      convertColumnToTableCell(
        column,
        rowCount,
        selectedRows,
        setSelectedRows,
        data,
        onSelectRow,
        classes
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
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowCount: PropTypes.number.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  setSelectedRows: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHeader;
