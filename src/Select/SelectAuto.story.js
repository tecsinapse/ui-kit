import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Select } from './Select';

const options = [
  {
    value: 'a',
    label: 'A',
  },
  {
    value: 'b',
    label: 'BBBBBB',
  },
  {
    value: 'c',
    label: 'CCCCCCCCCC',
  },
];

// Dummy select to show auto menu
export const SelectWrapper3 = props => {
  const [multiValue, setMultiValue] = useState(['a', 'b', 'c']);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          minHeight: 600,
        }}
      />
      <Select
        value={multiValue}
        options={options}
        onChange={setMultiValue}
        label="Placeholder"
        {...props}
      />
      <div
        style={{
          minHeight: 600,
        }}
      />
    </div>
  );
};

storiesOf(`${GROUPS.FORMS}|Select`, module).add('Select Show Auto', () => (
  <SelectWrapper3 isMulti menuPlacement="auto" variant="web" />
));
