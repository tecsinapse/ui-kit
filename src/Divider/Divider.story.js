import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Divider } from './Divider';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.LAYOUT}|Divider`, module)
  .addParameters({
    component: Divider,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Divider` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('divider', () => <Divider variant="solid" />);
