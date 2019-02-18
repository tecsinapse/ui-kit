import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const convertColumnToTableCell = ({ title, options = {} }) => (
  <TableCell align={options.numeric ? 'right' : 'left'}>{title}</TableCell>
);

const TableHeader = ({ columns }) => {
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

export default TableHeader;
