import React from 'react';

import { UiKitCard } from '../../components/Card/UiKitCard';

const style = { width: '350px' };

export const CardStory = props => (
  <div style={style}>
    <UiKitCard {...props} />
  </div>
);
