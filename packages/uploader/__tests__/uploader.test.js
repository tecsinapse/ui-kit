import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { FormUploader } from '../src/Uploader';
import { onAccept, onDeleteFiles, onReject } from '../stories/helpers';

test('Render Uploader', () => {
  const files = {};
  const setFiles = () => {};

  const { container, getByText } = render(
    <TestProvider>
      <FormUploader
        value={files}
        onAccept={onAccept(files, setFiles, () => {})}
        onReject={onReject(files, setFiles, () => {})}
        onDelete={onDeleteFiles(files, setFiles)}
      />
    </TestProvider>
  );

  expect(container).toContainElement(getByText('Drag and drop a file'));
});
