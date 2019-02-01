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
export const SelectWrapper = ({variant}) => {
  const [value, setValue] = useState('a');
  return (
    <Select
      value={value}
      options={options}
      onChange={setValue}
      variant={variant}
      label="Placeholder"
    />
  );
};

storiesOf(`${GROUPS.FORMS}|Select`, module).add('Select Mobile', () => (
  <SelectWrapper />
));
