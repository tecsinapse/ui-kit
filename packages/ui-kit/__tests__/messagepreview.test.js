import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MessagePreview } from 'components/MessagePreview';

test('Render MessagePreview', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <MessagePreview unformattedMessage="unformattedText" />
    </TestProvider>
  );
  const element = getByTestId('test-render-message-preview');

  expect(container).toContainElement(element);
});
