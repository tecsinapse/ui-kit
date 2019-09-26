import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import Password from './Password';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('input password', () => <Password name="password" label="Password" />);
