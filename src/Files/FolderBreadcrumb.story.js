import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FolderBreadcrumb } from './FolderBreadcrumb';

storiesOf(`${GROUPS.FILES}|FolderBreadcrumb`, module).add('simple', () => (
  <FolderBreadcrumb breadcrumbs={['BMW', 'BMW - Manutenção', 'Instalações']} />
));
