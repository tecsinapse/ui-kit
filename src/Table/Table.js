import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  resolveObj,
  isEmptyOrNull,
  isNotEmptyOrNull,
} from '@tecsinapse/es-utils/core/object';
import { tableStyles } from './tableStyle';
import TableRowFilter from './TableRowFilter';
import TableHeader from './TableHeader';

const stringifyIfObject = value =>
  typeof value === 'object' ? JSON.stringify(value) : value;

const convertValuesToTableCell = ({ field, options = {} }, values) => (
  <TableCell align={options.numeric ? 'right' : 'left'}>
    {stringifyIfObject(resolveObj(field, values))}
  </TableCell>
);

const convertDataValuesToTableRow = (columns, dataValues, classes) => (
  <TableRow hover className={classes.row}>
    {columns.map(column => convertValuesToTableCell(column, dataValues))}
  </TableRow>
);

const createRows = (columns, rowData, classes) => {
  if (isEmptyOrNull(columns)) return null;

  const rows = [];

  if (isNotEmptyOrNull(rowData)) {
    rows.push(
      rowData.map(dataValues =>
        convertDataValuesToTableRow(columns, dataValues, classes)
      )
    );
  }

  return rows;
};

const Table = props => {
  const { data, columns, onFilterData } = props;

  const classes = tableStyles();
  const [rowData, setRowData] = useState([...data]);
  const [tableColumns] = useState([...columns]);
  const someColumnHasFilter = columns.some(
    ({ options = {} }) => options.filter
  );

  return (
    <MUITable className={classes.table}>
      <TableHeader columns={tableColumns} />
      <TableBody>
        <TableRowFilter
          rendered={someColumnHasFilter}
          columns={tableColumns}
          onChangeFilter={onChangeFilter(
            data,
            setRowData,
            tableColumns,
            onFilterData
          )}
        />
        {createRows(tableColumns, rowData, classes)}
      </TableBody>
    </MUITable>
  );
};

const onChangeFilter = (data, setRowData, columns, onFilterData) => () => {
  let filteredData = [...data];

  columns.forEach(column => {
    filteredData = filteredData.filter(row => {
      const valueField = resolveObj(column.field, row);

      if (!column.filterValue) return true;

      if (typeof valueField === 'object') {
        return true;
      }
      if (typeof valueField === 'string') {
        return valueField
          .toLowerCase()
          .includes(column.filterValue.toLowerCase());
      }
      return false;
    });
  });

  setRowData(filteredData);
  onFilterData(filteredData);
};

Table.defaultProps = {
  data: [],
  onFilterData: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string.isRequired,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  onFilterData: PropTypes.func,
};

export default Table;
