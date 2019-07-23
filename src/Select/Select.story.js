import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Select } from './Select';
import { Input } from '../Inputs/Input';

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
      style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll' }}
    >
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Select
        value={multiValue}
        options={options}
        onChange={setMultiValue}
        label="Placeholder"
        {...props}
      />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </div>
  );
};

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

export const SelectWrapper2 = props => {
  const [value, setValue] = useState([null]);
  return (
    <Select
      value={value}
      options={options}
      placeholder="select your destiny"
      menuPlacement="top"
      onChange={setValue}
      label="Placeholder"
      {...props}
    />
  );
};

storiesOf(`${GROUPS.FORMS}|Select`, module)
  .add('Select Auto Detect', () => <SelectWrapper />)
  .add('Select No Value', () => <SelectWrapper2 />)
  .add('Select No Value Multi', () => <SelectWrapper2 isMulti />)
  .add('Select Web', () => <SelectWrapper variant="web" />)
  .add('Select Mobile', () => <SelectWrapper variant="mobile" />)
  .add('Select Mobile Multi', () => <SelectWrapper isMulti variant="mobile" />)
  .add('Select Web Multi', () => <SelectWrapper isMulti variant="web" />)
  .add('Select Show Auto', () => (
    <SelectWrapper3 isMulti menuPlacement="auto" variant="web" />
  ))
  .add('Multi FullScreen auto-size not allowed select all', () => (
    <SelectWrapper isMulti variant="web" allowSelectAll={false} />
  ));
