import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { ButtonGroup } from 'components/Buttons';

const labels = [
  { label: 'Button1', onClick: () => {}, active: false },
  { label: 'Button2', onClick: () => {}, active: false },
  { label: 'Button3', onClick: () => {}, active: false },
];

test('render Button Group', () => {
  const { container, getByText } = render(
    <TestProvider>
      <ButtonGroup labels={labels} />
    </TestProvider>
  );
  const element = getByText('Button1');

  expect(container).toContainElement(element);
});

test('render Button Group Color Primary', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} color="primary" />
    </TestProvider>
  );
  const button = getByTestId('buttonGroupTest');

  expect(button.firstChild.className.includes('Primary')).toBeTruthy();
});

test('render Button Group Small', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} size="small" />
    </TestProvider>
  );
  const button = getByTestId('buttonGroupTest');

  expect(button.firstChild.className.includes('Small')).toBeTruthy();
});

test('render Button Group FullWidth', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} fullWidth />
    </TestProvider>
  );
  const button = getByTestId('buttonGroupTest');

  expect(button.firstChild.className.includes('fullWidth')).toBeTruthy();
});

test('render Button Group Orientation', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} orientation="horizontal" />
    </TestProvider>
  );
  const button = getByTestId('buttonGroupTest');

  expect(button.className.includes('Horizontal')).toBeTruthy();
});

test('render Button Group with multiselect', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} multiselect />
    </TestProvider>
  );
  const button1 = getByTestId('buttonGroupTest');
  const button2 = getByTestId('buttonGroupTest');

  expect(button1.className.includes('outlinedPrimary'));
  expect(button2.className.includes('outlinedPrimary'));

  fireEvent.click(button1);
  fireEvent.click(button2);

  expect(button1.className.includes('containedPrimary'));
  expect(button2.className.includes('containedPrimary'));
});

test('render Button Group Orientation', () => {
  const { getByTestId } = render(
    <TestProvider>
      <ButtonGroup labels={labels} orientation="horizontal" />
    </TestProvider>
  );
  const button = getByTestId('buttonGroupTest');

  expect(button.className.includes('Horizontal')).toBeTruthy();
});
