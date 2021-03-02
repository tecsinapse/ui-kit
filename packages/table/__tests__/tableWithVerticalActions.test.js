import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import { columnsAction } from '../stories/storyHelper';
import { cars } from '../stories/exampleData';

test('Render table with vertical actions', async () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={columnsAction}
        data={cars}
        verticalActions
        rowId={row => row.id}
        actions={[
          {
            label: 'Mail',
            onClick: () => {},
            bottomDivider: true,
          },
          {
            label: 'Search item',
            onClick: () => {},
          },
        ]}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
