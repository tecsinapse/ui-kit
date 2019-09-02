import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Divider } from './Divider';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.LAYOUT}|Divider`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('divider', () => <Divider variant="error" />);
