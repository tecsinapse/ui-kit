import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { Drawer } from './Drawer';
import { demoItems } from './demoItems';

storiesOf(`${GROUPS.MENU}|Drawer`, module)
  .addParameters({
    component: Drawer,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Drawer` component can receive the following props:
          </Description>
          <Props />
          <Description>
            The `items` prop receives an object as parameter, where the
            attribute `componentProps` have 2 ways to be rendered. If the
            component is of type `a`, `componentProps` should contain `href`
            attribute pointing to the URL. If the component type is a router
            `Link`, `componentProps` should contain `to` attribute pointing to
            the resource location.
          </Description>
        </>
      ),
    },
  })
  .add('Drawer', () => (
    <Drawer
      items={demoItems}
      open
      onClose={() => {}}
      productName="Gestão de Frotas"
      subtitle="TecSinapse"
      title="Portal"
      styleProps={{
        selectedBackgroundColor: 'blue',
      }}
    />
  ));
