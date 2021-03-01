import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Snackbar } from 'components/Snackbar';
import React from 'react';

test('Render Snackbar', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Snackbar show variant="error">
        Test Snackbar
      </Snackbar>
    </TestProvider>
  );
  const element = getByText('Test Snackbar');

  expect(container).toContainElement(element);
});
