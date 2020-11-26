import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import { isEmptyOrNull, isNotEmptyOrNull } from '@tecsinapse/es-utils/build';
import { useTheme } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { mdiArrowUp, mdiArrowUpDown } from '@mdi/js';
import Icon from '@mdi/react';
import { headerStyles, sortStyles } from './styles';

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

const ConvertColumnToTableCell = ({
  column: { field, title, options = {}, selection },
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
  index,
}) => {
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

const Header = ({
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
  const effectRef = useRef(false);
  const [sortedColumIndex, setSortedColumIndex] = useState(
    columns.findIndex(item => !!item.options?.defaultSort)
  );

  useEffect(() => {
    if (!effectRef.current && sortedColumIndex !== -1) {
      onChangeSortFilter(
        columns[sortedColumIndex].field,
        columns[sortedColumIndex].options?.defaultSort
      );
    }
  }, [effectRef]); // eslint-disable-line react-hooks/exhaustive-deps

  if (tableHeaderHide) {
    return null;
  }

  return (
    <TableHead>
      <TableRow>
        {(columns || []).map((column, index) => (
          <ConvertColumnToTableCell
            key={column?.title}
            sortedColumIndex={sortedColumIndex}
            setSortedColumIndex={setSortedColumIndex}
            index={index}
            classes={classes}
            data={data}
            column={column}
            filters={filters}
            onChangeSortFilter={onChangeSortFilter}
            onSelectRow={onSelectRow}
            rowId={rowId}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            theme={theme}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

Header.defaultProps = {
  selectedRows: null,
  onSelectRow: null,
  setSelectedRows: null,
  tableHeaderHide: false,
};

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  setSelectedRows: PropTypes.func,
  tableHeaderHide: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowId: PropTypes.func.isRequired,
};

export default Header;
