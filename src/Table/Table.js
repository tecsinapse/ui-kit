import React from 'react';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const objectDeepPath = (obj, key) => {
  if (!key || !obj) return obj;

  const fieldNames = key.split('.');

  let value = { ...obj };

  fieldNames.forEach(field => {
    if (value == null || value === undefined) return;
    value = value[field];
  });

  return typeof value === 'object' ? JSON.stringify(value) : value;
};

const convertColumnToTableCell = ({ title, options = {} }) => (
  <TableCell align={options.numeric ? 'right' : 'left'}>{title}</TableCell>
);

const createHeaders = columns => {
  let tableCells = null;

  if (columns && columns.length > 0) {
    tableCells = columns.map(convertColumnToTableCell);
  }

  return (
    <TableHead>
      <TableRow>{tableCells}</TableRow>
    </TableHead>
  );
};

const convertValuesToTableCell = ({ field, options = {} }, values) => (
  <TableCell align={options.numeric ? 'right' : 'left'}>
    {objectDeepPath(values, field)}
  </TableCell>
);

const convertDataValuesToTableRow = (columns, dataValues, classes) => (
  <TableRow className={classes.row}>
    {columns.map(column => convertValuesToTableCell(column, dataValues))}
  </TableRow>
);

const createBody = (columns, data, classes) => {
  let rows = null;

  if (columns && columns.length > 0 && data && data.length > 0) {
    rows = data.map(dataValues =>
      convertDataValuesToTableRow(columns, dataValues, classes)
    );
  }

  return <TableBody>{rows}</TableBody>;
};

const Table = props => {
  const { columns, data } = props;
  const classes = useStyles();
  return (
    <MUITable className={classes.table}>
      {createHeaders(columns)}
      {createBody(columns, data, classes)}
    </MUITable>
  );
};

export default Table;
