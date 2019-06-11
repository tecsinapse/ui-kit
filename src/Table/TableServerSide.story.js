import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { resolveObj } from '@tecsinapse/es-utils/core/object';
import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { countries } from './exampleData';

const columns = [
  {
    title: 'Country',
    field: 'name',
    options: {
      filter: true,
    },
  },
  {
    title: 'Code',
    field: 'code',
    options: {
      filter: true,
    },
  },
  {
    title: 'Continent',
    field: 'continent.name',
    options: {
      filter: true,
    },
  },
];

const ServerSideTable = () => (
  <Paper style={{ width: 800 }}>
    <Table
      columns={columns}
      data={async filters => {
        const { headerFilters, page, rowsPerPage } = filters;

        let filteredData = [...countries];

        Object.keys(headerFilters).forEach(field => {
          const filterValue = headerFilters[field];

          filteredData = filteredData.filter(row => {
            const valueField = resolveObj(field, row);

            if (!filterValue) {
              return true;
            }

            if (typeof valueField === 'object') {
              return true;
            }
            if (typeof valueField === 'string') {
              return valueField
                .toLowerCase()
                .includes(filterValue.toLowerCase());
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
      }}
      rowId={row => row.code}
      toolbarOptions={{ title: 'Server Side Example' }}
      pagination
      exportOptions={{
        exportTypes: [
          {
            type: 'csv',
          },
        ],
      }}
      options={{
        selection: true,
      }}
    />
  </Paper>
);

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add('Server Side Table', () => (
  <ServerSideTable />
));
