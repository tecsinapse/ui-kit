import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { ConfirmationAlert } from 'components/Alerts';

test('Render Alert', () => {
  const { getByText } = render(
    <TestProvider>
      <ConfirmationAlert
        show
        proceed={() => {}}
        dismiss={() => {}}
        cancel={() => {}}
      />
    </TestProvider>
  );
  const element = getByText('Você tem certeza?');

  expect(element).toContainElement(element);
});
