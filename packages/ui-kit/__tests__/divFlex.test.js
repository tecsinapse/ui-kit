import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { DivFlex } from 'components/DivFlex';

test('Render DivFlex', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <DivFlex>
        <h1>test</h1>
      </DivFlex>
    </TestProvider>
  );

  const testId = getByTestId('test-render');

  expect(container).toContainElement(testId);
});
