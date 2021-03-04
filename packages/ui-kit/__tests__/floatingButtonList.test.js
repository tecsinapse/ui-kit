import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { FloatingButtonList } from 'components/Buttons/FloatingButtonList';
import { FloatingButton } from 'components/Buttons/';

test('render Floating Button List', () => {
  const open = true;

  const { container, getByTestId } = render(
    <TestProvider>
      <FloatingButtonList
        open={open}
        items={[
          {
            text: 'Absoluto',
            component: (
              <FloatingButton key="absoluto" color="secondary">
                1
              </FloatingButton>
            ),
          },
          {
            text: 'Absoluto 2',
            component: (
              <FloatingButton key="absoluto2" color="secondary">
                2
              </FloatingButton>
            ),
          },
        ]}
      />
    </TestProvider>
  );
  const divFloatingButton = getByTestId('render-floating-button-div');

  expect(container).toContainElement(divFloatingButton);
});

test('render Floating Button List OPEN', () => {
  const { getByTestId } = render(
    <TestProvider>
      <FloatingButtonList
        open
        onClick={() => {}}
        items={[
          {
            text: 'Absoluto',
            component: (
              <FloatingButton key="absoluto" color="secondary">
                1
              </FloatingButton>
            ),
          },
          {
            text: 'Absoluto 2',
            component: (
              <FloatingButton key="absoluto2" color="secondary">
                2
              </FloatingButton>
            ),
          },
        ]}
      />
    </TestProvider>
  );
  const divFloatingButton = getByTestId('render-floating-button-div');
  const floatingButton = divFloatingButton.children[0];

  expect(floatingButton.className.includes('entered')).toBeTruthy();
});

test('render Floating Button List CLOSE', () => {
  const { getByTestId } = render(
    <TestProvider>
      <FloatingButtonList
        open={false}
        onClick={() => {}}
        items={[
          {
            text: 'Absoluto',
            component: (
              <FloatingButton key="absoluto" color="secondary">
                1
              </FloatingButton>
            ),
          },
          {
            text: 'Absoluto 2',
            component: (
              <FloatingButton key="absoluto2" color="secondary">
                2
              </FloatingButton>
            ),
          },
        ]}
      />
    </TestProvider>
  );
  const divFloatingButton = getByTestId('render-floating-button-div');
  const floatingButton = divFloatingButton.children[0];

  expect(floatingButton.className.includes('hidden')).toBeTruthy();
});
