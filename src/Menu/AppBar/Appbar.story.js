import React from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiOneUp, mdiShieldHalfFull, mdiTurtle } from '@mdi/js';

import Icon from '@mdi/react';
import { styled } from '@material-ui/styles';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import { AppBar } from './AppBar';

const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
});
storiesOf(`${GROUPS.MENU}|AppBar`, module)
  .add('AppBar', () => (
    <AppBar
      leftIcons={
        <div>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiShieldHalfFull} color="white" size={1} />
          </IconButton>
        </div>
      }
      title="Portal "
      subtitle="Tecsinapse"
      breadcrumbs={[
        {
          title: 'Portal',
          component: 'a',
        },
        {
          title: 'Usuários',
          component: 'a',
        },
        {
          title: 'Usuário',
          component: 'a',
        },
        {
          title: '#1234',
          component: 'a',
        },
      ]}
      rightIcons={
        <div>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiOneUp} color="white" size={1} />
          </IconButton>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiTurtle} color="white" size={1} />
          </IconButton>
        </div>
      }
    />
  ))
  .add('Styled AppBar', () => (
    <StyledAppBar
      leftIcons={
        <div>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiShieldHalfFull} color="white" size={1} />
          </IconButton>
        </div>
      }
      title="Portal "
      subtitle="Tecsinapse"
      breadcrumbs={[
        {
          title: 'Portal',
          component: 'a',
        },
        {
          title: 'Usuários',
          component: 'a',
        },
        {
          title: 'Usuário',
          component: 'a',
        },
        {
          title: '#1234',
          component: 'a',
        },
      ]}
      rightIcons={
        <div>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiOneUp} color="white" size={1} />
          </IconButton>
          <IconButton color="inherit" aria-label="Abrir menu">
            <Icon path={mdiTurtle} color="white" size={1} />
          </IconButton>
        </div>
      }
    />
  ));
