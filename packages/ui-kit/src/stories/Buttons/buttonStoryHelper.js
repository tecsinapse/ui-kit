import React, { useState } from 'react';
import { FloatingButton } from '../../components/Buttons/FloatingButton';
import { FloatingButtonList } from '../../components/Buttons/FloatingButtonList';
import { Button } from '../../components/Buttons/Button';

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

export const style = {
  width: '100vw',
  height: '160px',
  backgroundColor: '#e0e0e0',
};

export const FloatingButtonListStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <FloatingButtonList
      onClick={() => setOpen(!open)}
      open={open}
      items={items}
    />
  );
};

export const SuccessStory = () => {
  const [submitting, setSub] = useState(false);

  return (
    <Button
      customVariant="success"
      onClick={() => setSub(true)}
      submitting={submitting}
    >
      Smart Button
    </Button>
  );
};
