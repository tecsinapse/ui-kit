import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Button, Input } from '@tecsinapse/ui-kit';
import FilterIcon from '@material-ui/icons/FilterList';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { countries } from '../stories/exampleData';
import {
  countryColumns,
  countryOptions,
  fetchData,
} from '../stories/storyHelper';
import { Table } from '../src';

test('Render Table wiht custom Advanced Filters', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={countryColumns}
        data={fetchData(countries)}
        rowId={row => row.code}
        toolbarOptions={countryOptions}
        onDrawerClose={() => {}}
        customAdvancedFilters={{
          applyFilters: () => {},
          cleanFilters: () => {},
          cleanFiltersLabel: 'Limpar Filtros',
          toolbarButton: handleClick => (
            <Button
              onClick={handleClick}
              startIcon={<FilterIcon />}
              customVariant="default"
              size="small"
            >
              Filtros Avançados
            </Button>
          ),
          filters: (
            <div>
              <Typography variant="subtitle2">Continent</Typography>
              <Input
                name="continent"
                placeholder="Continent"
                fullWidth
                variantDevice="web"
                disabled
              />
              <Typography variant="subtitle2">Languages</Typography>
              <div>
                <FormControlLabel
                  control={<Switch size="small" />}
                  label="ca"
                  checked
                  disabled
                />
                <FormControlLabel
                  control={<Switch size="small" />}
                  label="ar"
                  checked
                  disabled
                />
                <FormControlLabel
                  control={<Switch size="small" />}
                  label="ps/uz/tk"
                  checked
                  disabled
                />
                <FormControlLabel
                  control={<Switch size="small" />}
                  label="pt"
                  checked
                  disabled
                />
              </div>
            </div>
          ),
        }}
      />
    </TestProvider>
  );
  const element = getByText('Advanced Filters Example');

  expect(container).toContainElement(element);
});
