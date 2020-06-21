import React from 'react';

import { UiKitCard } from './UiKitCard';

const style = { width: '350px' };

export const CardStory = props => (
  <div style={style}>
    <UiKitCard {...props} />
  </div>
);
