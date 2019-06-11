import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from './Table';
import { cars } from './exampleData';
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
    customRender: row => {
      const style = { padding: 5 };
      return (
        <div
          style={
            row.model.year < 2016
              ? { backgroundColor: '#f44336', color: 'white', ...style }
              : style
          }
        >
          {row.model.year}
        </div>
      );
    },
  },
];

const CustomRenderTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table columns={columns} data={cars} rowId={row => row.id} />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add(
  'Custom Render Table',
  () => <CustomRenderTable />
);
