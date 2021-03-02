import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { ButtonGroup } from 'components/Buttons';

const labels = [
  { label: 'Button1', onClick: () => {}, active: false },
  { label: 'Button2', onClick: () => {}, active: false },
  { label: 'Button3', onClick: () => {}, active: false },
];

test('render Button Group', () => {
  const { container, getByText } = render(
    <TestProvider>
      <ButtonGroup labels={labels} />
    </TestProvider>
  );
  const element = getByText('Button1');

  expect(container).toContainElement(element);
});
