import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Password } from 'components/Password';
import * as React from 'react';

test('Render password', () => {
  const a = { name: 'password', label: 'Password' };
  const { container, getByLabelText } = render(
    <TestProvider>
      <Password {...a} />
    </TestProvider>
  );
  const label = getByLabelText('Password');

  expect(container).toContainElement(label);
  expect(label.type).toBe('password');
});
