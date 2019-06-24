import React from 'react';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from './Table';
import { cars } from './exampleData';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { defaultRed } from '../colors';

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

const actions = [
  {
    icon: <MailIcon />,
    tooltip: 'Mail',
    onClick: rowData => {
      // eslint-disable-next-line
      console.log(JSON.stringify(rowData));
    },
  },
  {
    icon: <SearchIcon />,
    tooltip: 'Search item',
    onClick: rowData => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
  },
  {
    icon: <EditIcon />,
    tooltip: 'Edit item',
    onClick: rowData => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
  },
  {
    icon: <DeleteIcon />,
    tooltip: 'Delete item',
    onClick: (rowData, event) => {
      // eslint-disable-next-line no-console
      console.log(event);
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
    visible: rowData => rowData.brand === 'BMW',
  },
];

const ActionTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={cars}
      rowId={row => row.id}
      actions={actions}
    />
  </Paper>
);
const ActionTableVertical = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={cars}
      verticalActions
      rowId={row => row.id}
      actions={[
        {
          label: 'Mail',
          onClick: rowData => {
            // eslint-disable-next-line
            console.log(JSON.stringify(rowData));
          },
          bottomDivider: true,
        },
        {
          labelColor: defaultRed,
          label: 'Search item',
          onClick: rowData => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(rowData));
          },
        },
      ]}
    />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('Action Table', ActionTable)
  .add('Action Table Vertical', ActionTableVertical);
