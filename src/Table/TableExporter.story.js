import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';

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
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      export: false,
      numeric: true,
    },
  },
  {
    title: 'Price',
    field: 'price',
    options: {
      visible: false,
    },
    customRender: ({ price }) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
];

const cars = [];

for (let index = 0; index < 70; index++) {
  cars.push(
    createCar(index, 'BMW', `BMW ${index + 1}`, 2018, 3 * (index + 10))
  );
}

const tableOptions = {
  selection: true,
};

const ExporterTable = () => (
  <Paper style={{ width: 800 }}>
    <Table
      columns={columns}
      data={cars}
      rowId={row => row.id}
      options={tableOptions}
      toolbarOptions={{ title: 'Pagination Example' }}
      pagination
      exportOptions={{
        exportTypes: [
          {
            type: 'csv',
          },
        ],
      }}
    />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module).add(
  'Exporter Table',
  ExporterTable
);
