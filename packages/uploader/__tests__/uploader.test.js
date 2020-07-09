import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UploaderStory } from '../src/utils/UploaderStory';
import { TestProvider } from '../../../utils/TestProvider';

test('Render Uploader', () => {
  const { container, getByText } = render(
    <TestProvider>
      <UploaderStory />
    </TestProvider>
  );

  expect(container).toContainElement(getByText('Drag and drop a file'));
});
