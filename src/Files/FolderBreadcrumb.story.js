import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FolderBreadcrumb } from './FolderBreadcrumb';
import { DivFlex } from '../withFlexCenter';

const breadcrumbs = [
  'BMW',
  'BMW - Manutenção',
  'Instalações',
  {
    title: 'Usuário',
    component: 'a',
    componentProps: {
      href: 'http://google.com.br',
    },
  },
];
storiesOf(`${GROUPS.FILES}|Folder Breadcrumb`, module)
  .addParameters({
    component: FolderBreadcrumb,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `FolderBreadcrumb` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('simple', () => <FolderBreadcrumb breadcrumbs={breadcrumbs} />)
  .add('simple light', () => (
    <FolderBreadcrumb breadcrumbs={breadcrumbs} light dense />
  ));
