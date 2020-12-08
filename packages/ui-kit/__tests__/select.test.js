import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Select } from 'components/Select';

beforeEach(() => {
  const createElement = document.createElement.bind(document);

  document.createElement = tagName => {
    if (tagName === 'canvas') {
      return {
        getContext: () => ({ measureText: () => ({}) }),
        measureText: () => ({}),
      };
    }

    return createElement(tagName);
  };
});

test('Render Select', () => {
  const { container, getByLabelText, getByText } = render(
    <TestProvider>
      <Select
        label="Input placeholder"
        options={[
          {
            value: 'a',
            label: 'A',
          },
          {
            value: 'b',
            label: 'BBBBBB',
          },
          {
            value: 'c',
            label: 'CCCCCCCCCC',
          },
        ]}
        value="a"
      />
    </TestProvider>
  );

  const element = getByLabelText('Input placeholder');

  expect(container).toContainElement(element);
  expect(container).toContainElement(getByText('A'));

  element.click();

  const byText = getByText('BBBBBB');

  expect(byText.textContent).toContain('BBBBBB');
});
