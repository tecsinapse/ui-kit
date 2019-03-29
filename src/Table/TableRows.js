import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  isEmptyOrNull,
  isNotEmptyOrNull,
} from '@tecsinapse/es-utils/core/object';
import TableRow from '@material-ui/core/TableRow';
import TableCells from './TableCells';

const tableRowStyles = hasSelection =>
  makeStyles(theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F5F5F5',
      },
      cursor: hasSelection ? 'pointer' : '',
    },
  }));

const isSelected = (selectedRows, row, rowId) =>
  isNotEmptyOrNull(selectedRows) &&
  selectedRows.some(selectedRow => rowId(selectedRow) === rowId(row));

const onClick = (
  rowData,
  hasSelection,
  onSelectRow,
  selectedRows,
  setSelectedRows,
  rowId
) => event => {
  if (!hasSelection) return;

  let checked = false;

  if (isEmptyOrNull(selectedRows)) {
    const newSelectedRows = [rowData];
    setSelectedRows(newSelectedRows);
    checked = true;

    if (onSelectRow) {
      onSelectRow(newSelectedRows, rowData, checked);
    }
  } else {
    let newSelectedRows = [];
    if (isSelected(selectedRows, rowData, rowId)) {
      newSelectedRows = selectedRows.filter(
        selectedRow => rowId(selectedRow) !== rowId(rowData)
      );
    } else {
      newSelectedRows = [...selectedRows, rowData];
      checked = true;
    }
    setSelectedRows(newSelectedRows);

    if (onSelectRow) {
      onSelectRow(newSelectedRows, rowData, checked);
    }
  }
};

const TableRows = ({
  columns,
  data,
  selectedRows,
  setSelectedRows,
  onSelectRow,
  rowId,
  forceCollapseActions,
}) => {
  const hasSelection = (columns || []).some(({ selection }) => selection);
  const classes = tableRowStyles(hasSelection)();

  if (isEmptyOrNull(columns) || isEmptyOrNull(data)) return null;

  return data.map(rowData => (
    <TableRow
      key={rowId(rowData)}
      hover
      className={classes.row}
      onClick={onClick(
        rowData,
        hasSelection,
        onSelectRow,
        selectedRows,
        setSelectedRows,
        rowId
      )}
    >
      <TableCells
        columns={columns}
        rowData={rowData}
        selectedRows={selectedRows}
        onSelectRow={onSelectRow}
        rowId={rowId}
        forceCollapseActions={forceCollapseActions}
      />
    </TableRow>
  ));
};

TableRows.defaultProps = {
  columns: [],
  data: [],
  selectedRows: [],
  forceCollapseActions: false,
};

TableRows.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  rowId: PropTypes.func.isRequired,
  forceCollapseActions: PropTypes.bool,
};

export default TableRows;
