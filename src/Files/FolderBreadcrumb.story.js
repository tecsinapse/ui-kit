import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
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
  .addDecorator(muiTheme(createMuiTheme({spacing: 1})))
  .add('simple', () => <FolderBreadcrumb breadcrumbs={breadcrumbs} />)
  .add('simple light', () => (
    <FolderBreadcrumb breadcrumbs={breadcrumbs} light dense />
  ));
