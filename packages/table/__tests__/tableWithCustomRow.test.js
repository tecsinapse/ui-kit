import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Collapse, TableCell, TableRow, Typography } from '@material-ui/core';
import { IconButton } from '@tecsinapse/ui-kit';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { resolveData } from '../src/Table';
import { cars } from '../stories/exampleData';
import { customColumns } from '../stories/storyHelper';
import { Table } from '../src';

test('Render table with custom row', () => {
  const expanded = true;
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={customColumns}
        data={cars}
        rowId={row => row.id}
        customRow={({ rowData }) => (
          <React.Fragment key={rowData.id}>
            <TableRow key={rowData.id} hover>
              {customColumns.map(item => (
                <TableCell
                  key={item.field}
                  align={
                    item.options && item.options.numeric ? 'right' : 'left'
                  }
                >
                  {resolveData(item.field, rowData)}
                </TableCell>
              ))}
            </TableRow>
            {rowData.id === 2 && (
              <TableRow>
                <TableCell colSpan={customColumns.length}>
                  <div>
                    <Typography variant="caption">Expand</Typography>
                    <IconButton size="small" onClick={() => {}}>
                      <Icon
                        path={expanded ? mdiChevronUp : mdiChevronDown}
                        size={0.75}
                      />
                    </IconButton>
                  </div>
                  <Collapse in={expanded}>
                    <div>
                      <Typography variant="subtitle2">
                        Custom container title
                      </Typography>
                      <Typography variant="caption">
                        Custom description
                      </Typography>
                      <Typography variant="caption">This is OK</Typography>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        )}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
