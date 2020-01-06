import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import { DivFlex } from '@tecsinapse/ui-kit/build/withFlexCenter';
import { Table } from './Table';
import { cars } from './exampleData';

const columns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      hiddenCard: true,
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
      hiddenCard: true,
    },
  },
];

const SimpleTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={cars}
      rowId={row => row.id}
      onRowClick={rowData => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(rowData));
      }}
    />
  </Paper>
);

storiesOf(`Table`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Simple Table', () => <SimpleTable />);
