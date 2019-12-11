import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import Icon from '@mdi/react';
import { mdiAccessPoint } from '@mdi/js';
import { Table } from './Table';
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
    },
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
    icon: <Icon path={mdiAccessPoint} size={1} />,
    tooltip: 'Teste',
    // eslint-disable-next-line no-console
    onClick: car => console.log(car),
    visible: car => car.model.name === 'BMW 2',
  },
];

const toolbar = {
  advancedFilters: {
    title: 'Pagination Example',
    selectedFiltersLabel: 'Filtro Ativos',
    applyFiltersLabel: 'Aplicar Filtros',
    filtersGroup: [{ name: 'grupo' }],
    filters: [
      {
        label: 'Modelo',
        name: 'modelo',
        type: 'input',
        group: 'grupo',
      },
    ],
  },
};

const cars = [];

for (let index = 0; index < 70; index++) {
  cars.push(createCar(index, 'BMW', `BMW ${index + 1}`, 2018, 30000000));
}

const data = async filters => {
  const {
    advancedFilters: { modelo },
    page,
    rowsPerPage,
  } = filters;

  const resultados = cars.filter(
    car =>
      !modelo || car.model.name.toLowerCase().includes(modelo.toLowerCase())
  );

  return {
    data: resultados.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    totalCount: resultados.length,
  };
};

const tableOptions = {
  selection: true,
};

const PaginationTable = () => (
  <Paper style={{ width: 1000 }}>
    <Table
      columns={columns}
      data={data}
      rowId={row => row.id}
      options={tableOptions}
      toolbarOptions={toolbar}
      actions={actions}
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

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Pagination Table', () => <PaginationTable />);
