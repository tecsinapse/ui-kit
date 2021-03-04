import { TestProvider } from 'TestProvider';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Drawer } from 'components/Menu';
import * as React from 'react';

const drawerDemoItems = [
  {
    title: 'Portal',
    children: [
      {
        title: 'Comunicados',
        children: [{ title: 'Meus Comunicados' }, { title: 'Criar' }],
      },
      {
        title: 'Usuários',
      },
      {
        title: 'Relatórios',
      },
    ],
  },
];

const drawerArgs = {
  productName: '',
  subtitle: '',
  title: '',
  onClose: () => {},
  open: true,
  srcAvatar:
    'https://thumbs.dreamstime.com/b/portrait-young-man-beard-hair-style-male-avatar-vector-portrait-young-man-beard-hair-style-male-avatar-105082137.jpg',
  logoProps: {
    src:
      'https://www.facom.ufms.br/wp-content/uploads/2019/05/ts-fundo-claro.png',
    height: 60,
    width: 130,
  },
};

test('Render Drawer', () => {
  const { getByText } = render(
    <TestProvider>
      <Drawer {...drawerArgs} items={drawerDemoItems} />
    </TestProvider>
  );
  const element = getByText('Portal');

  expect(element).toContainElement(element);
});

test('Render open item', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const { getByText, queryByText } = render(
    <TestProvider>
      <Drawer {...drawerArgs} items={drawerDemoItems} />
    </TestProvider>
  );
  const portal = getByText('Portal');
  const comunicados = queryByText('Comunicados');

  expect(comunicados).not.toBeInTheDocument();
  fireEvent.click(portal);
  const comunicados2 = getByText('Comunicados');

  expect(comunicados2).toBeInTheDocument();
});

test('Render close item', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const { getByText, queryByText } = render(
    <TestProvider>
      <Drawer {...drawerArgs} items={drawerDemoItems} />
    </TestProvider>
  );

  const portal = getByText('Portal');
  const comunicados = queryByText('Comunicados');

  expect(comunicados).not.toBeInTheDocument();
  fireEvent.click(portal);
  const comunicados2 = getByText('Comunicados');

  expect(comunicados2).toBeInTheDocument();
  fireEvent.click(portal);
  expect(comunicados).not.toBeInTheDocument();
});
