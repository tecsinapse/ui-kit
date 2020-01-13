import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import Password from './Password';
import { DivFlex } from '../withFlexCenter';
import { Input } from '..';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .addParameters({
    component: Input,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Input` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('input password', () => <Password name="password" label="Password" />);
