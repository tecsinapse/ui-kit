import React from 'react';

import { UiKitCard } from './UiKitCard';

export const CardStory = props => {
  return (
    <div style={{ width: '350px' }}>
      <UiKitCard {...props} />
    </div>
  );
};
