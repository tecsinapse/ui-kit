import React from 'react';
import { storiesOf } from '@storybook/react';

import { EmptyState } from './EmptyState';

storiesOf(`EmptyState`, module).add('Empty State', () => (
  <div>
    <EmptyState />
  </div>
));
