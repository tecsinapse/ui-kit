import { GroupedInput } from 'components/GroupedInput';
import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

const args = {
  name: 'telefones',
  label: 'Telefone',
  header: 'Telefones',
  hr: true,
  success: [true, undefined],
};

test('Render Grouped Input', () => {
  const { container, getByText } = render(
    <TestProvider>
      <GroupedInput
        {...args}
        values={[]}
        push={() => {}}
        remove={() => {}}
        onChange={() => {}}
      />
    </TestProvider>
  );
  // Test in header
  const headerText = getByText('Telefones');

  expect(container.firstChild).toContainElement(headerText);
});
