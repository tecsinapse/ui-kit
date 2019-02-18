import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import { cars } from './exampleData';

const columns = [
  {
    title: 'Brand',
    field: 'brand',
    options: {
      filter: true,
    },
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      filter: true,
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      filter: true,
      numeric: true,
    },
  },
];

const onFilterData = filteredData => {
  // eslint-disable-next-line no-console
  console.log(filteredData);
};

const FilteringTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table columns={columns} data={cars} onFilterData={onFilterData} />
  </Paper>
);

export default FilteringTable;
