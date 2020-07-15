import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Table } from '../src';
import { columnsSimple } from '../src/stories/storyHelper';
import { cars } from '../src/stories/exampleData';
import { TestProvider } from '../../../utils/TestProvider';

test('Render Table', () => {
  const { container } = render(
    <TestProvider>
      <Table
        columns={columnsSimple}
        data={cars}
        rowId={row => row.id}
        onRowClick={rowData => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(rowData));
        }}
      />
    </TestProvider>
  );
  const title = container.querySelector('span');

  expect(title.firstChild.textContent).toContain('Total: ');
});
