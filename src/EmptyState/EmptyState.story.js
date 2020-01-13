import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { EmptyState } from './EmptyState';
import { DivFlex } from '../withFlexCenter';

storiesOf(`EmptyState`, module)
  .addParameters({
    component: EmptyState,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `EmptyState` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Empty State', () => (
    <div>
      <EmptyState />
    </div>
  ));
