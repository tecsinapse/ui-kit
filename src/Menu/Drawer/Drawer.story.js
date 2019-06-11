import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { Drawer } from './Drawer';
import { demoItems } from './demoItems';

storiesOf(`${GROUPS.MENU}|Drawer`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add('Drawer', () => (
  <Drawer
    items={demoItems}
    open
    onClose={() => {}}
    productName="Gestão de Frotas"
    subtitle="TecSinapse"
    title="Portal"
  />
));
