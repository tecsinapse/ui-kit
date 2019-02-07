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

export const SelectWrapper = props => {
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

storiesOf(`${GROUPS.FORMS}|Select`, module)
  .add('Select Auto Detect', () => <SelectWrapper />)
  .add('Select Web', () => <SelectWrapper variant="web" />)
  .add('Select Mobile', () => <SelectWrapper variant="mobile" />)
  .add('Select Mobile Multi', () => <SelectWrapper isMulti variant="mobile" />)
  .add('Select Web Multi', () => <SelectWrapper isMulti variant="web" />);
