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
      title: '1. Portal',
      children: [
        {
          title: '1.1 Comunicados',
          children: [
            { title: '1.1.1. Meus Comunicados' },
            { title: '1.1.2 Criar' },
          ],
        },
        {
          title: '1.2 Usuários',
        },
        {
          title: '1.3 Relatórios',
        },
      ],
    },
    {
      title: '2. Aftersales',
      children: [
        {
          title: '2.1 Ordem de Serviço',
        },
        {
          title: '2.2 Relatórios',
        },
      ],
    },
    {
      title: '3. Aftersales',
      children: [
        {
          title: '3.1 Ordem de Serviço',
        },
        {
          title: '3.2 Relatórios',
        },
      ],
    },
    {
      title: '4. Aftersales',
      children: [
        {
          title: '4.1 Ordem de Serviço',
        },
        {
          title: '4.2 Relatórios',
        },
      ],
    },
    {
      title: '5. Aftersales',
      children: [
        {
          title: '5.1 Ordem de Serviço',
        },
        {
          title: '5.2 Relatórios',
        },
      ],
    },
    {
      title: '6. Aftersales',
      children: [
        {
          title: '6.1 Ordem de Serviço',
        },
        {
          title: '6.2 Relatórios',
        },
      ],
    },
    {
      title: '7. Aftersales',
      children: [
        {
          title: '7.1 Ordem de Serviço',
        },
        {
          title: '7.2 Relatórios',
        },
      ],
    },
    {
      title: '8. Aftersales',
      children: [
        {
          title: '8.1 Ordem de Serviço',
        },
        {
          title: '8.2 Relatórios',
        },
      ],
    },
    {
      title: '9. Aftersales',
      children: [
        {
          title: '9.1 Ordem de Serviço',
        },
        {
          title: '9.2 Relatórios',
        },
      ],
    },
    {
      title: '10. Aftersales',
      children: [
        {
          title: '10.1 Ordem de Serviço',
        },
        {
          title: '10.2 Relatórios',
        },
      ],
    },
    {
      title: '11. Emplacar',
      children: [
        {
          title: '11.1 Comunicados',
          children: [
            {
              title: '11.1.1 Comunicados',
              children: [
                { title: '11.1.1.1 Meus Comunicados' },
                { title: '11.1.1.2 Criar' },
              ],
            },
            {
              title: '11.1.2 Comunicados',
              children: [
                { title: '11.1.2.1 Meus Comunicados' },
                { title: '11.1.2.2 Criar' },
              ],
            },
            { title: '11.1.3 Criar' },
          ],
        },
        {
          title: '11.2 Outros Relatórios',
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
  srcLogo: 'https://www.facom.ufms.br/wp-content/uploads/2019/05/ts-fundo-claro.png',
  widthLogo: 130,
  heightLogo: 60,
  srcAvatar: 'https://thumbs.dreamstime.com/b/portrait-young-man-beard-hair-style-male-avatar-vector-portrait-young-man-beard-hair-style-male-avatar-105082137.jpg',
};
