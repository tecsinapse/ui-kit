import React from 'react';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import { storiesOf } from '@storybook/react';
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
      toolbarOptions={{
        title: 'List of Cars',
        actions: [
          {
            key: 'no-icon',
            label: 'No Icon Button',
            onClick: selectedRows => {},
          },
          {
            key: 'send',
            label: 'Send',
            iconRight: <SendIcon />,
            tooltip: 'Send rows do email',
            onClick: selectedRows =>
              // eslint-disable-next-line
              alert(`You have send ${selectedRows.length} row(s)`),
          },
          {
            key: 'delete',
            label: 'Delete',
            iconLeft: <DeleteIcon />,
            onClick: selectedRows =>
              // eslint-disable-next-line
              alert(`You have deleted ${selectedRows.length} row(s)`),
          },
        ],
      }}
    />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module).add(
  'Selection Table',
  SelectionTable
);
