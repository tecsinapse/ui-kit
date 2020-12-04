import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { UploaderStory } from '../stories/UploaderStory';

test('Render Uploader', () => {
  const { container, getByText } = render(
    <TestProvider>
      <UploaderStory />
    </TestProvider>
  );

  expect(container).toContainElement(getByText('Drag and drop a file'));
});
