import React from 'react';

import { Card } from 'components/Card';

const style = { width: '350px' };

export const CardStory = props => (
  <div style={style}>
    <Card {...props} />
  </div>
);
