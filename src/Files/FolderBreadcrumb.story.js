import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FolderBreadcrumb } from './FolderBreadcrumb';

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
storiesOf(`${GROUPS.FILES}|FolderBreadcrumb`, module)
  .add('simple', () => <FolderBreadcrumb breadcrumbs={breadcrumbs} />)
  .add('simple light', () => (
    <FolderBreadcrumb breadcrumbs={breadcrumbs} light dense />
  ));
