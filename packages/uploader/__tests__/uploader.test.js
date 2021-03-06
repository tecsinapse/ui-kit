import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Uploader } from '../src';
import { onAccept, onDeleteFiles, onReject } from '../stories/helpers';

test('Render uploader', () => {
  const files = {};
  const setFiles = () => {};
  const { container, getByText } = render(
    <TestProvider>
      <Uploader
        messages={{ title: 'test-render' }}
        onAccept={onAccept(files, setFiles, () => {})}
        onReject={onReject(files, setFiles, () => {})}
        onDelete={onDeleteFiles(files, setFiles)}
      />
    </TestProvider>
  );
  const element = getByText('test-render');

  expect(container).toContainElement(element);
});
