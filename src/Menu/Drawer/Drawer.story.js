import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiOneUp, mdiShieldHalfFull, mdiTurtle } from '@mdi/js';

import Icon from '@mdi/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import Drawer from './Drawer';

storiesOf(`${GROUPS.MENU}|Drawer`, module).add('Drawer', () => <Drawer open />);
