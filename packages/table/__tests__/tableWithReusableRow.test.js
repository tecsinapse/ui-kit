import { TableRow } from '@material-ui/core';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Table } from '../src';
import { customColumns } from '../stories/storyHelper';
import { cars } from '../stories/exampleData';
import { Cells, handleRowClick } from '../build';

test('Render Table With Reusable Row', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Table
        columns={customColumns}
        data={cars}
        rowId={row => row.id}
        options={{
          selection: true,
        }}
        actions={[]}
        toolbarOptions={{ title: 'Custom reusable row' }}
        customRow={({
          rowData,
          rowId,
          columns,
          selectedRows,
          onSelectRow,
          setSelectedRows,
          onRowClick,
          forceCollapseActions,
          verticalActions,
        }) => {
          const hasSelection = (columns || []).some(
            ({ selection }) => selection
          );

          return (
            <TableRow
              key={rowId(rowData)}
              hover
              onClick={handleRowClick(
                rowData,
                hasSelection,
                onSelectRow,
                onRowClick,
                selectedRows,
                setSelectedRows,
                rowId
              )}
            >
              <Cells
                columns={columns}
                rowData={rowData}
                selectedRows={selectedRows}
                onSelectRow={onSelectRow}
                rowId={rowId}
                forceCollapseActions={forceCollapseActions}
                verticalActions={verticalActions}
              />
            </TableRow>
          );
        }}
      />
    </TestProvider>
  );
  const element = getByText('Z4');

  expect(container).toContainElement(element);
});
