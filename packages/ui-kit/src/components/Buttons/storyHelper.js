import React from 'react';
import { FloatingButton } from './FloatingButton';

export const handleClick = () => {
  // eslint-disable-next-line no-console
  console.log('Button clicked');
};

export const items = [
  {
    text: 'Absoluto',
    component: (
      <FloatingButton key="absoluto" color="primary">
        1
      </FloatingButton>
    ),
  },
  {
    text: 'Absoluto 2',
    component: (
      <FloatingButton key="absoluto2" color="primary">
        2
      </FloatingButton>
    ),
  },
];
