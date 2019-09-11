import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import { makeStyles } from '@material-ui/core';

import Table from './Table';
import { cars } from './exampleData';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

const useStyle = makeStyles(() => ({
  rootMobile: {
    height: '100vh',
  },
}));

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

const SimpleTable = () => {
  const classes = useStyle();

  return (
    <Paper style={{ width: 1000 }}>
      <Table
        columns={columns}
        data={cars}
        rowId={row => row.id}
        classes={classes}
        onRowClick={rowData => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(rowData));
        }}
      />
    </Paper>
  );
};

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Simple Table', () => <SimpleTable />);
