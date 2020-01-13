/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '@mdi/react';
import { mdiAccount, mdiEmail, mdiKey } from '@mdi/js';
import { grey } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

import { UiKitCard } from './UiKitCard';
import { Button } from '..';

const CardStory = ({ styleCard }) => {
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
      <UiKitCard
        styleCard={styleCard}
        onClick={() => console.log('card click')}
        title={title}
        subtitle="Subtitle example"
        content="Description"
        subContent="Extra content"
        actions={actions}
      />
    </div>
  );
};

storiesOf(`${GROUPS.COMPONENTS}|Card`, module)
  .addParameters({
    component: UiKitCard,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            This component is exported from UI-KIT as `Card`. The component can
            receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('full card', () => <CardStory />)
  .add('custom subtitle color', () => (
    <CardStory styleCard={{ customSubtitleColor: 'orange' }} />
  ));
