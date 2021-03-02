import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import {
  countryColumns,
  countryOptions,
  fetchData,
} from '../stories/storyHelper';
import { countries } from '../stories/exampleData';

test('Render Table with Advanced Filters', () => {
  const { container, getByText, getByTestId } = render(
    <TestProvider>
      <Table
        columns={countryColumns}
        data={fetchData(countries)}
        rowId={row => row.code}
        toolbarOptions={countryOptions}
      />
    </TestProvider>
  );
  const element = getByText('Advanced Filters Example');
  const element2 = getByTestId('advanced-filters-button');

  expect(container).toContainElement(element);
  expect(container).toContainElement(element2);
});
