import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import Table from './Table';
import { Select } from '../Select/Select';
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

const FilterComponent = () => {
  const options = [
    {
      value: 'a',
      label: 'Option A',
    },
    {
      value: 'b',
      label: 'Option B',
    },
    {
      value: 'c',
      label: 'Option C',
    },
  ];
  const [value, setValue] = useState('a');
  return (
    <div style={{ height: '200px' }}>
      <Select
        value={value}
        options={options}
        onChange={setValue}
        label="Placeholder"
      />
      <Select
        value={value}
        options={options}
        onChange={setValue}
        label="Placeholder 2"
      />
      <Button style={{ marginTop: 15 }}>Filter</Button>
    </div>
  );
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
        advancedFiltersComponent: <FilterComponent />,
      }}
    />
  </Paper>
);

export default SelectionTable;
