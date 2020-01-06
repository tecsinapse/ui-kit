import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import { makeStyles } from '@material-ui/core';

import { DivFlex } from '@tecsinapse/ui-kit/build/withFlexCenter';
import { Table } from './Table';
import { countries } from './exampleData';

const useStyle = makeStyles(() => ({
  rootMobile: {
    height: '100vh',
  },
}));

const columns = [
  {
    title: 'Country',
    field: 'name',
  },
  {
    title: 'Continent',
    field: 'continent.name',
  },
  {
    title: 'Languages',
    field: 'languages',
    customRender: row => row.languages.map(l => l.name).join(', '),
  },
];

const options = {
  title: 'Advanced Filters Example',
  advancedFilters: {
    filtersGroup: [
      {
        name: 'region',
        label: 'Region',
      },
    ],
    filters: [
      {
        label: 'Country',
        type: 'input',
        name: 'country',
        group: 'region',
      },
      {
        label: 'Continent',
        type: 'multi-select',
        name: 'continent',
        group: 'region',
        options: [
          {
            label: 'Asia',
            value: 'Asia',
          },
          {
            label: 'Europe',
            value: 'Europe',
          },
          {
            label: 'South America',
            value: 'South America',
          },
        ],
      },
    ],
  },
};

const fetchData = props => async filters => {
  const {
    advancedFilters: { continent },
    page,
    rowsPerPage,
  } = filters;

  let {
    advancedFilters: { country },
  } = filters;

  if (country) {
    country = country.toLowerCase();
  }

  const results = props.filter(item => {
    const countryName = item.name.toLowerCase();

    if (country && !countryName.includes(country)) {
      return false;
    }
    return !(
      continent &&
      continent.length &&
      !continent.some(land => land === item.continent.name)
    );
  });

  return {
    data: results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    totalCount: results.length,
  };
};

const AdvancedFiltersTable = () => {
  const classes = useStyle();

  return (
    <Paper style={{ width: 800 }}>
      <Table
        columns={columns}
        data={fetchData(countries)}
        rowId={row => row.code}
        classes={classes}
        toolbarOptions={options}
        pagination
      />
    </Paper>
  );
};

storiesOf(`Table`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Advanced Filters Table', () => <AdvancedFiltersTable />);
