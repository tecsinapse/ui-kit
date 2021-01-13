import * as React from 'react';
import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import Icon from '@mdi/react';
import { grey } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import { mdiAccount, mdiEmail, mdiKey } from '@mdi/js';
import { DivFlex } from 'components/DivFlex';
import { Card } from 'components/Card';
import { Button } from 'components/Buttons';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Card`,
  component: Card,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            This component is exported from UI-KIT as `Card`. The component can
            receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const title = {
    name: 'UI-KIT Card',
    components: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Chip
          label="React"
          size="small"
          style={{
            marginTop: '-1px',
            fontSize: '10px',
            height: 'auto',
            padding: '2px 4px',
            color: '#FFF',
            marginLeft: '6px',
            paddingLeft: '5px',
            paddingRight: '5px',
            fontWeight: 500,
            backgroundColor: grey[700],
          }}
        />
      </div>
    ),
  };

  const actions = (
    <div
      style={{
        padding: '8px 15px',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      <Button>
        <Icon path={mdiAccount} size={1} />
      </Button>
      <Button>
        <Icon path={mdiKey} size={1} />
      </Button>
      <Button>
        <Icon path={mdiEmail} size={1} />
      </Button>
    </div>
  );

  return (
    <div style={{ width: '350px' }}>
      <Card {...args} title={title} actions={actions} />
    </div>
  );
};

Base.args = {
  subtitle: 'Subtitle example',
  content: 'Description',
  subContent: 'Extra content',
  onClick: action('onClick'),
};
