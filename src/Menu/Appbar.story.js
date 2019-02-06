import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiOneUp, mdiShieldHalfFull, mdiTurtle } from '@mdi/js';

import Icon from '@mdi/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { AppBar } from './AppBar';

storiesOf(`${GROUPS.MENU}|AppBar`, module).add('AppBar', () => (
  <AppBar
    renderLeftIcons={() => (
      <Fragment>
        <IconButton color="inherit" aria-label="Abrir menu">
          <Icon path={mdiShieldHalfFull} color="white" size={1} />
        </IconButton>
      </Fragment>
    )}
    title="Portal BAMAQ"
    renderRightIcons={() => (
      <Fragment>
        <IconButton color="inherit" aria-label="Abrir menu">
          <Icon path={mdiOneUp} color="white" size={1} />
        </IconButton>
        <IconButton color="inherit" aria-label="Abrir menu">
          <Icon path={mdiTurtle} color="white" size={1} />
        </IconButton>
      </Fragment>
    )}
  />
));
