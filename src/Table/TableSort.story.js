import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

const createCar = (id, brand, name, year, price) => ({
  id,
  brand,
  model: {
    name,
    year,
  },
  price,
});

const columns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
      sort: true,
    },
  },
];

const cars = [];

for (let index = 0; index < 70; index++) {
  cars.push(
    createCar(index, 'BMW', `BMW ${index + 1}`, 2018 + index, 30000000)
  );
}

const tableOptions = {
  selection: true,
};

const PaginationTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={cars}
      rowId={row => row.id}
      options={tableOptions}
      toolbarOptions={{ title: 'Sort Example' }}
      pagination
    />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Sort Table', PaginationTable);
