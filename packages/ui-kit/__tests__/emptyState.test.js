import { EmptyState } from 'components/EmptyState';
import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

test('Render Empty State', () => {
  const { container, getByText } = render(
    <TestProvider>
      <EmptyState />
    </TestProvider>
  );
  const element = getByText('Xiiiiii...');

  expect(container).toContainElement(element);
});
