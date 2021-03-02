import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table } from '../src';
import { columnsAction } from '../stories/storyHelper';
import { cars } from '../stories/exampleData';

test('Render table with selection', async () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={columnsAction}
        data={cars}
        rowId={row => row.id}
        options={{
          selection: true,
        }}
        onSelectRow={() => {}}
        toolbarOptions={{
          title: 'List of Cars',
          actions: [
            {
              key: 'no-icon',
              label: 'No Icon Button',
              onClick: () => {},
            },
            {
              key: 'send',
              label: 'Send',
              iconRight: <SendIcon />,
              tooltip: 'Send rows do email',
              onClick: () => {},
            },
            {
              key: 'delete',
              label: 'Delete',
              iconLeft: <DeleteIcon />,
              onClick: () => {},
            },
          ],
        }}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
