import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import { cars } from './exampleData';

const columns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
    },
  },
];

const tableOptions = {
  selection: true,
};

const onSelectRow = (selectedRows, selectedRow, checked) => {
  // eslint-disable-next-line no-console
  console.log(selectedRows);
  // eslint-disable-next-line no-console
  console.log(checked);
  // eslint-disable-next-line no-console
  console.log(selectedRow);
};

const SelectionTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={cars}
      rowId={row => row.id}
      options={tableOptions}
      onSelectRow={onSelectRow}
    />
  </Paper>
);

export default SelectionTable;
