import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Button } from 'components/Buttons';

test('Render Button', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Button>Button label</Button>
    </TestProvider>
  );

  expect(container).toContainElement(getByText('Button label'));
});

test('Render Button Submitting', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <Button submitting data-testid="buttonTest">
        Button label
      </Button>
    </TestProvider>
  );

  const button = getByTestId('buttonTest');

  expect(container).toContainElement(button);
  expect(container).toContainElement(getByTestId('button-loading'));
  expect(button).toBeDisabled();
});

test('Render Button Disabled', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <Button disabled data-testid="buttonTest">
        Button label
      </Button>
    </TestProvider>
  );

  const button = getByTestId('buttonTest');

  expect(container).toContainElement(button);
  expect(button).toBeDisabled();
});

test('Render Error Button', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <Button disabled data-testid="buttonTest" customVariant="error">
        Button label
      </Button>
    </TestProvider>
  );

  const button = getByTestId('buttonTest');

  expect(container).toContainElement(button);
  expect(button.className.includes('buttonColorError')).toBeTruthy();
});

test('Render Success Button', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <Button disabled data-testid="buttonTest" customVariant="success">
        Button label
      </Button>
    </TestProvider>
  );

  const button = getByTestId('buttonTest');

  expect(container).toContainElement(button);
  expect(button.className.includes('buttonColorSuccess')).toBeTruthy();
});

test('Render Warning Button', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <Button disabled data-testid="buttonTest" customVariant="warning">
        Button label
      </Button>
    </TestProvider>
  );

  const button = getByTestId('buttonTest');

  expect(container).toContainElement(button);
  expect(button.className.includes('buttonColorWarning')).toBeTruthy();
});
