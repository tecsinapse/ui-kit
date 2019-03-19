import React from 'react';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/DeleteForever';
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

export default ActionTable;
