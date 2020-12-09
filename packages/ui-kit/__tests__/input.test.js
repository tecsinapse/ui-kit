import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Input } from 'components/Inputs';

test('Render Input', () => {
  const { container, getByPlaceholderText } = render(
    <TestProvider>
      <Input name="testInput" placeholder="Input placeholder" />
    </TestProvider>
  );

  expect(container).toContainElement(getByPlaceholderText('Input placeholder'));
});

test('Render Input Event', () => {
  const { container, getByPlaceholderText } = render(
    <TestProvider>
      <Input name="testInput" placeholder="Input placeholder" />
    </TestProvider>
  );

  const input = getByPlaceholderText('Input placeholder');

  fireEvent.change(input, { target: { value: 'sample value' } });

  expect(container).toContainElement(input);
  expect(input.value).toBe('sample value');
});

test('Render Input With Value', () => {
  const { container, getByPlaceholderText } = render(
    <TestProvider>
      <Input
        name="testInput"
        placeholder="Input placeholder"
        value="sample value"
      />
    </TestProvider>
  );

  const input = getByPlaceholderText('Input placeholder');

  expect(container).toContainElement(input);
  expect(input.value).toBe('sample value');
});

test('Render Input With Error', () => {
  const { container, getByText, getByPlaceholderText } = render(
    <TestProvider>
      <Input
        name="testInput"
        placeholder="Input placeholder"
        error="Insert valid value"
      />
    </TestProvider>
  );

  const input = getByPlaceholderText('Input placeholder');
  const errorHelper = getByText('Insert valid value');

  expect(container).toContainElement(input);
  expect(input.parentElement.className.includes('InputRed')).toBeTruthy();
  expect(errorHelper).toHaveClass('Mui-error');
});

test('Render Input With Warning', () => {
  const { container, getByPlaceholderText } = render(
    <TestProvider>
      <Input name="testInput" placeholder="Input placeholder" warning />
    </TestProvider>
  );

  const element = getByPlaceholderText('Input placeholder');

  expect(container).toContainElement(element);
  expect(element.parentElement.className.includes('InputWarning')).toBeTruthy();
});

test('Render Input With Success', () => {
  const { container, getByPlaceholderText } = render(
    <TestProvider>
      <Input name="testInput" placeholder="Input placeholder" success />
    </TestProvider>
  );

  const element = getByPlaceholderText('Input placeholder');

  expect(container).toContainElement(element);
  expect(element.parentElement.className.includes('InputSuccess')).toBeTruthy();
});
