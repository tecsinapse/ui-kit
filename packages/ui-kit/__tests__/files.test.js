import { FolderBreadcrumb } from 'components/Files';
import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

const breadcrumbs = [
  'Home',
  'Users',
  {
    title: 'Jane',
    component: 'a',
    componentProps: {
      href: 'http://google.com.br',
    },
  },
];

test('Render Files', () => {
  const { container, getByText } = render(
    <TestProvider>
      <FolderBreadcrumb breadcrumbs={breadcrumbs} />
    </TestProvider>
  );
  const element = getByText('Jane');

  expect(container).toContainElement(element);
});
