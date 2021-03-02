import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import { customColumns } from '../stories/storyHelper';
import { cars } from '../stories/exampleData';

test('Render With Custom Header', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={customColumns}
        data={cars}
        rowId={row => row.id}
        toolbarOptions={{
          title: (
            <div>
              <Typography variant="h6">Custom header</Typography>
              <FormControlLabel
                control={<Switch size="small" />}
                label="On/Off"
              />
            </div>
          ),
        }}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
