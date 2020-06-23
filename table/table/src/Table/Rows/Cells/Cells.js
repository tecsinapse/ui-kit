import React from 'react';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { isNotEmptyOrNull } from '@tecsinapse/es-utils/build';
import RowActions from '../RowActions/RowActions';
import { resolveData } from '../../utils/tableFunctions';

const isSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

const convertValuesToTableCell = (
  { field, options = {}, selection, actions, customRender },
  rowData,
  rowId,
  selectedRows,
  forceCollapseActions,
  verticalActions,
  theme
) => {
  const { visible = true } = options;

  if (!visible) {
    return null;
  }

  if (selection) {
    return (
      <TableCell key={field} padding="checkbox">
        <Checkbox checked={isSelected(selectedRows, rowData, rowId)} />
      </TableCell>
    );
  }
  if (actions) {
    const style = {
      paddingRight: theme.spacing(1),
      width:
        forceCollapseActions || actions.length >= 4
          ? '50px'
          : `${actions.length * 50}px`,
      paddingTop: 0,
      paddingBottom: 0,
    };
    return (
      <TableCell key={field} align="right" style={style}>
        <RowActions
          actions={actions}
          row={rowData}
          rowId={rowId}
          verticalActions={verticalActions}
          forceCollapseActions={forceCollapseActions}
        />
      </TableCell>
    );
  }
  return (
    <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
      {customRender ? customRender(rowData) : resolveData(field, rowData)}
    </TableCell>
  );
};

export const Cells = ({
  columns,
  rowData,
  rowId,
  selectedRows,
  forceCollapseActions,
  verticalActions,
}) => {
  const theme = useTheme();

  return columns.map(column =>
    convertValuesToTableCell(
      column,
      rowData,
      rowId,
      selectedRows,
      forceCollapseActions,
      verticalActions,
      theme
    )
  );
};

Cells.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  rowId: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  forceCollapseActions: PropTypes.bool,
};
