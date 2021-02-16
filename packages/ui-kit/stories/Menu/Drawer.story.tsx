import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { Drawer } from 'components/Menu';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.MENU}/Drawer`,
  component: Drawer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `Drawer` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const drawerDemoItems = [
    {
      title: 'Portal',
      children: [
        {
          title: 'Comunicados',
          children: [
            { title: 'Meus Comunicados' },
            { title: 'Criar' },
          ],
        },
        {
          title: 'Usuários',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 1',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 2',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 3',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 4',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 5',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 6',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 7',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 8',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios',
        },
      ],
    },
    {
      title: 'Aftersales 9',
      children: [
        {
          title: 'Ordem de Serviço',
        },
        {
          title: 'Relatórios 10',
        },
      ],
    },
    {
      title: 'Emplacar',
      children: [
        {
          title: 'Comunicados',
          children: [
            {
              title: 'Comunicados',
              children: [
                { title: 'Meus Comunicados' },
                { title: 'Criar' },
              ],
            },
            {
              title: 'Comunicados',
              children: [
                { title: 'Meus Comunicados' },
                { title: 'Criar' },
              ],
            },
            { title: 'Criar' },
          ],
        },
        {
          title: 'Outros Relatórios',
        },
      ],
    },
  ];

  return (
    <Drawer
      {...args}
      items={drawerDemoItems}
      styleProps={{
        selectedBackgroundColor: 'blue',
      }}
    />
  );
};

Base.args = {
  productName: '',
  subtitle: '',
  title: '',
  onClose: action('onClose'),
  open: true,
  srcAvatar: 'https://thumbs.dreamstime.com/b/portrait-young-man-beard-hair-style-male-avatar-vector-portrait-young-man-beard-hair-style-male-avatar-105082137.jpg',
  logoProps: {
    src: 'https://www.facom.ufms.br/wp-content/uploads/2019/05/ts-fundo-claro.png',
    height: 60,
    width: 130
  }
};
