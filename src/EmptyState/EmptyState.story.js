import React from 'react';
import { storiesOf } from '@storybook/react';

import { EmptyState } from './EmptyState';
import { DivFlex } from '../withFlexCenter';

storiesOf(`EmptyState`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Empty State', () => (
    <div>
      <EmptyState />
    </div>
  ));
