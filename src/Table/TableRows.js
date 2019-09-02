import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  isEmptyOrNull,
  isNotEmptyOrNull,
} from '@tecsinapse/es-utils/core/object';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { VisibilityOff } from '@material-ui/icons';
import TableCells from './TableCells';
import { EmptyStateWrapper } from '../EmptyState/EmptyState';
import { LocaleContext } from '../LocaleProvider';

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
  onRowClick,
  selectedRows,
  setSelectedRows,
  rowId
) => event => {
  if (onRowClick) {
    onRowClick(rowData);
    return;
  }
  if (!hasSelection) {
    return;
  }

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
  onRowClick,
  forceCollapseActions,
  verticalActions,
}) => {
  const hasSelection = (columns || []).some(({ selection }) => selection);
  const classes = tableRowStyles(hasSelection || !!onRowClick)();

  const {
    Table: { emptyStateTitle, emptyStateMessage },
  } = useContext(LocaleContext);

  if (isEmptyOrNull(columns)) {
    return null;
  }

  if (isEmptyOrNull(data)) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length}>
          <EmptyStateWrapper
            IconComponent={VisibilityOff}
            titleMessage={emptyStateTitle}
            message={emptyStateMessage}
          />
        </TableCell>
      </TableRow>
    );
  }

  return data.map(rowData => (
    <TableRow
      key={rowId(rowData)}
      hover
      className={classes.row}
      onClick={onClick(
        rowData,
        hasSelection,
        onSelectRow,
        onRowClick,
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
        verticalActions={verticalActions}
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
