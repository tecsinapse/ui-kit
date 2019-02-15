import React from 'react';
import { storiesOf } from '@storybook/react';
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';

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
  {
    title: 'Price',
    field: 'price',
    options: {
      numeric: true,
    },
  },
];

const cars = [
  {
    brand: 'BMW',
    model: {
      name: 'X5',
      year: '2018',
    },
    price: '29000000',
  },
  {
    brand: 'AUDI',
    model: {
      name: 'A5',
      year: '2018',
    },
    price: '21000000',
  },
  {
    brand: 'Mercedes',
    model: {
      name: 'Classe C C-200',
      year: '2015',
    },
    price: '10980000',
  },
  {
    brand: 'BMW',
    model: {
      name: 'Z4',
      year: '2018',
    },
    price: '21700000',
  },
];

storiesOf(`${GROUPS.COMPONENTS}|Table`, module).add('Simple Table', () => (
  <Paper style={{ width: 1000 }}>
    <Table columns={columns} data={cars} />
  </Paper>
));
