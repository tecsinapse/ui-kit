import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Select } from './Select';

const options = [
  {
    value: 'a',
    label: 'Option A',
  },
  {
    value: 'b',
    label: 'Option B',
  },
  {
    value: 'c',
    label: 'Option C',
  },
];

export const SelectWrapper = (props) => {
  const [value, setValue] = useState('a');
  return (
    <Select
      value={value}
      options={options}
      onChange={setValue}
      label="Placeholder"
      {...props}
    />
  );
};

storiesOf(`${GROUPS.FORMS}|Select`, module).add('Select Mobile', () => (
  <SelectWrapper />
));
