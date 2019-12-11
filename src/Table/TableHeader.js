import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import { isEmptyOrNull, isNotEmptyOrNull } from '@tecsinapse/es-utils/build';
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { mdiArrowUp, mdiArrowUpDown } from '@mdi/js';
import Icon from '@mdi/react';

const headerStyles = makeStyles(theme => ({
  selectionColumn: {
    width: '7%',
  },
  ascending: {
    paddingTop: 0,
    paddingRight: theme.spacing(1 / 5),
    paddingBottom: theme.spacing(1 / 3),
    paddingLeft: theme.spacing(1 / 5),
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  descending: {
    paddingTop: theme.spacing(1 / 3),
    paddingRight: theme.spacing(1 / 5),
    paddingBottom: 0,
    paddingLeft: theme.spacing(1 / 5),
    transform: 'rotate(180deg)',
  },
}));

const sortStyles = makeStyles(() => ({
  sortedHover: {
    transition: 'opacity 0.25s',
    opacity: ({ sortedActive }) => (!sortedActive ? 1 : 100),
    '&:hover': {
      opacity: 100,
    },
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
  rowId,
  filters,
  onChangeSortFilter,
  theme,
  sortedColumIndex,
  setSortedColumIndex,
  index
) => {
  const sortedActive = sortedColumIndex === index;
  const sortClasses = sortStyles({ sortedActive });
  const { visible = true } = options;
  const { sort = false } = options;

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
      {!options.numeric && title}
      {sort && (
        <IconButton
          disableFocusRipple
          disableRipple
          onClick={() => {
            setSortedColumIndex(index);
            return onChangeSortFilter(field);
          }}
          className={clsx(classes.ascending, sortClasses.sortedHover, {
            [classes.descending]: !filters.ascending,
          })}
        >
          <Icon
            path={sortedActive ? mdiArrowUp : mdiArrowUpDown}
            color={
              field === filters.sortField && sortedActive
                ? theme.palette.text.primary
                : theme.palette.text.disabled
            }
            size={0.8}
          />
        </IconButton>
      )}
      {options.numeric && title}
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
  filters,
  onChangeSortFilter,
}) => {
  const classes = headerStyles();
  const theme = useTheme();
  const [sortedColumIndex, setSortedColumIndex] = useState(null);

  if (tableHeaderHide) {
    return null;
  }

  let tableCells = null;

  if (columns && columns.length > 0) {
    tableCells = columns.map((column, index) =>
      convertColumnToTableCell(
        column,
        selectedRows,
        setSelectedRows,
        data,
        onSelectRow,
        classes,
        rowId,
        filters,
        onChangeSortFilter,
        theme,
        sortedColumIndex,
        setSortedColumIndex,
        index
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
