import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Switch } from 'components/Switch';
import React from 'react';

test('Render Switch', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Switch labels={{ left: 'On', rigth: 'Off' }} />
    </TestProvider>
  );
  const element = getByText('On');

  expect(container).toContainElement(element);
});
