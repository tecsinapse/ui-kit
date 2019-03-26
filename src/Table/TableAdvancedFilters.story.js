import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import { useManualQuery } from 'graphql-hooks';
import { resolveObj } from '@tecsinapse/es-utils/core/object';
import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';

const COUNTRIES_QUERY = `query countries {
	countries {
		name
		code
		continent {
			name
		}
		languages {
			code
			name
		}
	}
  }`;

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
    field: 'languages.name',
    customRender: row => row.languages.map(l => l.name).join(', '),
  },
];

const fetchData = fetch => async filters => {
  const {
    data: { countries },
  } = await fetch();
  const { headerFilters, page, rowsPerPage } = filters;

  let filteredData = [...countries];

  Object.keys(headerFilters).forEach(field => {
    const filterValue = headerFilters[field];

    filteredData = filteredData.filter(row => {
      const valueField = resolveObj(field, row);

      if (!filterValue) return true;

      if (typeof valueField === 'object') {
        return true;
      }
      if (typeof valueField === 'string') {
        return valueField.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    });
  });
  return {
    data: filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    totalCount: filteredData.length,
  };
};

const AdvancedFiltersTable = () => {
  const [fetch] = useManualQuery(COUNTRIES_QUERY);
  return (
    <Paper style={{ width: 800 }}>
      <Table
        columns={columns}
        data={fetchData(fetch)}
        rowId={row => row.code}
        toolbarOptions={{
          title: 'Advanced Filters Example',
          advancedFiltersOptions: {
            applyFiltersLabel: 'Aplicar Filtros',
            filtersGroup: [
              {
                name: 'period',
                label: 'Period',
              },
              {
                name: 'country',
                label: 'Country',
              },
            ],
            filters: [
              {
                label: 'First date',
                type: 'date',
                name: 'first_date',
                group: 'period',
              },
              {
                label: 'Last date',
                type: 'date',
                name: 'last_date',
                group: 'period',
              },
              {
                label: 'Country',
                type: 'input',
                name: 'country',
                group: 'country',
              },
              {
                label: 'Continent',
                type: 'multi-select',
                name: 'continent',
                group: 'country',
                options: [
                  {
                    label: 'Africa',
                    value: 'Africa',
                  },
                  {
                    label: 'Antarctica',
                    value: 'Antarctica',
                  },
                  {
                    label: 'Asia',
                    value: 'Asia',
                  },
                  {
                    label: 'Europe',
                    value: 'Europe',
                  },
                  {
                    label: 'North America',
                    value: 'North America',
                  },
                  {
                    label: 'Oceania',
                    value: 'Oceania',
                  },
                  {
                    label: 'South America',
                    value: 'South America',
                  },
                ],
              },
            ],
          },
        }}
        pagination
      />
    </Paper>
  );
};

storiesOf(`${GROUPS.COMPONENTS}|Table`, module).add(
  'Advanced Filters Table',
  () => <AdvancedFiltersTable />
);
