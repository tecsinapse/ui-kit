import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { resolveObj, isNotEmptyOrNull } from '@tecsinapse/es-utils/core/object';

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;
const isSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

const createButton = ({ icon, tooltip, onClick }, rowData) => {
  const onClickButton = event => {
    if (onClick) {
      onClick(rowData, event);
      event.stopPropagation();
    }
  };
  const button = <IconButton onClick={onClickButton}>{icon}</IconButton>;

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }
  return button;
};

const convertValuesToTableCell = (
  { field, options = {}, selection, actions },
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
  if (actions) {
    const buttons = actions.map(action => createButton(action, rowData));

    return (
      <TableCell key={field} align="right" style={{ width: '100px' }}>
        {buttons}
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
