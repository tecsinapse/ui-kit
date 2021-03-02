import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import { columnsAction } from '../stories/storyHelper';
import { cars } from '../stories/exampleData';

test('Render table with sorting', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={columnsAction}
        data={cars}
        rowId={row => row.id}
        actions={[]}
        onRowClick={() => {}}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
