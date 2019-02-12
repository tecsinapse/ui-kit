import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { Drawer } from './Drawer';
import { demoItems } from './demoItems';

storiesOf(`${GROUPS.MENU}|Drawer`, module).add('Drawer', () => (
  <Drawer items={demoItems} open onClose={() => {}} />
));
