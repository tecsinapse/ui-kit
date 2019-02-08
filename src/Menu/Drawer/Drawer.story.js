import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { Drawer } from './Drawer';

storiesOf(`${GROUPS.MENU}|Drawer`, module).add('Drawer', () => <Drawer open />);
