import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import { exporterColumns } from '../stories/storyHelper';

test('Render table with footer export', () => {
  const carsList = [];

  carsList.push({
    id: 1,
    brand: 'BMW',
    model: {
      name: 'BMW 1',
      year: 2018,
    },
    price: 3 * 10,
  });
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={exporterColumns}
        data={carsList}
        rowId={row => row.id}
        options={{
          selection: true,
        }}
        toolbarOptions={{ title: 'Exporter Example' }}
        pagination
        exportOptions={{
          position: 'footer',
          exportTypes: [
            {
              type: 'custom',
              label: 'Export to Custom',
              exportFunc: () => {},
            },
          ],
        }}
      />
    </TestProvider>
  );
  const element = getByText('BMW');

  expect(container).toContainElement(element);
});
