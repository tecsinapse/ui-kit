import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { FloatingButton } from 'components/Buttons';
import DeleteIcon from '@material-ui/icons/Delete';

test('render Button Group', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <FloatingButton>
        <DeleteIcon />
      </FloatingButton>
    </TestProvider>
  );
  const element = getByTestId('test-render');

  expect(container).toContainElement(element);
});
