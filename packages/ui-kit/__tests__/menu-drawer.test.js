import { TestProvider } from 'TestProvider';
import { render } from '@testing-library/react';
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

// render, open, close, ver se tem filho
