import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import { resolveObj } from '@tecsinapse/es-utils/build';
import Table from './Table';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { countries } from './exampleData';
import { DivFlex } from '../withFlexCenter';

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
        const {
          headerFilters,
          page,
          rowsPerPage,
          startIndex,
          stopIndex,
          loadedResolver,
        } = filters;

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
            // It can get the slice by start/stop index or page/rowsPerPage.
            // The first one is for mobile, while the second one is for desktop
            loadedResolver ? startIndex : page * rowsPerPage,
            loadedResolver ? stopIndex : page * rowsPerPage + rowsPerPage
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
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Server Side Table', () => <ServerSideTable />);
