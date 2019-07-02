import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { GroupedInput } from './GroupedInput';

function GroupedWrapper({ empty, error }) {
  const [values, setValues] = useState(empty ? [] : ['a', 'b']);
  return (
    <GroupedInput
      name="telefones"
      label="Telefone"
      header="Telefones"
      error={error}
      values={values}
      onChange={(value, index) => {
        setValues(v => {
          const newArray = v;
          newArray[index] = value;
          return newArray;
        });
      }}
      remove={index => {
        setValues(v => {
          v.splice(index, 1);
          return v;
        });
      }}
      push={() => setValues(v => [...v, ''])}
    />
  );
}

storiesOf(`${GROUPS.FORMS}|GroupedInput`, module)
  .add('grouped input', () => <GroupedWrapper />)
  .add('grouped input empty', () => <GroupedWrapper empty />)
  .add('grouped input empty error', () => (
    <GroupedWrapper empty error="should not be empty" />
  ));
