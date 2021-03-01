import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { Card } from 'components/Card';
import Chip from '@material-ui/core/Chip';

const title = {
  name: 'UI-KIT Card',
  components: (
    <div>
      <Chip label="React" size="small" />
    </div>
  ),
};

const testeArgs = {
  subtitle: 'Subtitle example',
  content: 'Description',
  subContent: 'Extra content',
  onClick: () => {},
};

test('Render Card', () => {
  const { container, getByText } = render(
    <TestProvider>
      <Card {...testeArgs} title={title} />
    </TestProvider>
  );
  const element = getByText('UI-KIT Card');

  element.click();

  expect(container).toContainElement(element);
  expect(container).toContainElement(getByText('Subtitle example'));
  expect(container).toContainElement(getByText('Description'));

  const byText = getByText('Extra content');

  expect(byText.textContent).toContain('Extra content');
});

/// render, click
