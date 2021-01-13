import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { AppBar } from 'components/Menu';
import IconButton from '@material-ui/core/IconButton';
import { mdiBell, mdiOneUp, mdiTurtle } from '@mdi/js';
import Icon from '@mdi/react';
import Badge from '@material-ui/core/Badge';
import { GROUPS } from 'hierarchySeparators';

export default {
  title: `${GROUPS.MENU}/App Bar`,
  component: AppBar,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `AppBar` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => (
  <AppBar
    {...args}
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
          <Icon path={mdiOneUp} color="#FFF" size={1} />
        </IconButton>
        <IconButton color="inherit" aria-label="Abrir menu">
          <Icon path={mdiTurtle} color="#FFF" size={1} />
        </IconButton>
        <IconButton aria-label="Mostrar notificações" color="inherit">
          <Badge badgeContent={17}>
            <Icon path={mdiBell} color="#FFF" size={1} />
          </Badge>
        </IconButton>
      </div>
    }
  />
);

Base.args = {
  title: 'Portal ',
  subtitle: 'Tecsinapse',
};
