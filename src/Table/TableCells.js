import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { resolveObj, isNotEmptyOrNull } from '@tecsinapse/es-utils/core/object';

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;
const isSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

const convertValuesToTableCell = (
  { field, options = {}, selection },
  rowData,
  rowCount,
  rowId,
  selectedRows
) => {
  if (selection) {
    return (
      <TableCell key={field} padding="checkbox">
        <Checkbox checked={isSelected(selectedRows, rowData, rowId)} />
      </TableCell>
    );
  }
  return (
    <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
      {stringifyIfObject(resolveObj(field, rowData))}
    </TableCell>
  );
};

const TableCells = ({ columns, rowData, rowId, rowCount, selectedRows }) =>
  columns.map(column =>
    convertValuesToTableCell(column, rowData, rowCount, rowId, selectedRows)
  );

TableCells.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  rowId: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
};

export default TableCells;
