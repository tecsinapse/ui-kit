import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { isNotEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import TableRowActions from './TableRowActions';
import { resolveData } from './tableFunctions';

const isSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

const convertValuesToTableCell = (
  { field, options = {}, selection, actions, customRender },
  rowData,
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
  if (actions) {
    return (
      <TableCell
        key={field}
        align="right"
        style={{
          paddingRight: 0,
          width: actions.length < 4 ? `${actions.length * 50}px` : '50px',
        }}
      >
        <TableRowActions actions={actions} row={rowData} rowId={rowId} />
      </TableCell>
    );
  }
  return (
    <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
      {customRender ? customRender(rowData) : resolveData(field, rowData)}
    </TableCell>
  );
};

const TableCells = ({ columns, rowData, rowId, selectedRows }) =>
  columns.map(column =>
    convertValuesToTableCell(column, rowData, rowId, selectedRows)
  );

TableCells.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  rowId: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
};

export default TableCells;
