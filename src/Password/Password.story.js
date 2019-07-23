import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import Password from './Password';

storiesOf(`${GROUPS.FORMS}|Input`, module).add('input password', () => (
  <Password name="password" label="Password" />
));
