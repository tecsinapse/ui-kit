import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppBar } from 'components/Menu';

import * as React from 'react';

test('Render AppBar', () => {
  const { container, getByText } = render(
    <TestProvider>
      <AppBar {...args} />
    </TestProvider>
  );
  const argTitle1 = getByText('Portal');

  expect(container).toContainElement(argTitle1);
});

const args = {
  title: 'Portal ',
  subtitle: 'Tecsinapse',
};
