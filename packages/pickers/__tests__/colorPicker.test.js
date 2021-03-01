import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { ColorPicker } from '../src';

const args = {
  name: 'color',
  defaultValue: '#DDD',
  label: 'Color Picker',
  onChange: () => {},
};

test('Render Picker Color', () => {
  const { container } = render(
    <TestProvider>
      <ColorPicker {...args} />
    </TestProvider>
  );
  const input = container.querySelector('input');

  expect(input.value).toBe('#DDD');
});
