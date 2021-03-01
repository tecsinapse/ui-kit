import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { PreviewList } from '../src';

test('Render Preview List', () => {
  const { container, getByText } = render(
    <TestProvider>
      <PreviewList />
    </TestProvider>
  );
  const element = getByText('Upload Files');

  expect(container).toContainElement(element);
});
