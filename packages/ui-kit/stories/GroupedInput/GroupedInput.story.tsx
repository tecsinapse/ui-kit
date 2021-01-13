import * as React from 'react';
import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import { useState } from 'react';
import { GROUPS } from 'hierarchySeparators';
import { GroupedInput } from 'components/GroupedInput';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.FORMS}/Grouped Input`,
  component: GroupedInput,

  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `GroupedInput` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [values, setValues] = useState(['', '']);

  return (
    <GroupedInput
      {...args}
      values={values}
      onChange={(value, index) => {
        action('onChange')(value, index);
        setValues(v => {
          const newArray = [...v];
          newArray[index] = value;
          return newArray;
        });
      }}
      remove={index => {
        action('remove')(index);
        setValues(v => {
          const newArray = [...v];
          newArray.splice(index, 1);
          return newArray;
        });
      }}
      push={() => setValues(v => [...v, ''])}
    />
  );
};

Base.args = {
  name: 'telefones',
  label: 'Telefone',
  header: 'Telefones',
  hr: true,
  success: [true, undefined],
};

export const Error = args => {
  const [values, setValues] = useState(['', '']);

  return (
    <GroupedInput
      {...args}
      values={values}
      onChange={(value, index) => {
        action('onChange')(value, index);
        setValues(v => {
          const newArray = v;
          newArray[index] = value;
          return newArray;
        });
      }}
      remove={index => {
        action('remove')(index);
        setValues(v => {
          const newArray = [...v];
          newArray.splice(index, 1);
          return newArray;
        });
      }}
      push={() => setValues(v => [...v, ''])}
    />
  );
};

Error.args = {
  name: 'telefones',
  label: 'Telefone',
  header: 'Telefones',
  error: ['', 'Não deve estar vazio'],
  warnings: [true, undefined],
};
