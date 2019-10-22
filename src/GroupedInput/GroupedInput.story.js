import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { GroupedInput } from './GroupedInput';
import { DivFlex } from '../withFlexCenter';

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
          const newArray = [...v];
          newArray.splice(index, 1);
          return newArray;
        });
      }}
      push={() => setValues(v => [...v, ''])}
    />
  );
}

storiesOf(`${GROUPS.FORMS}|GroupedInput`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('grouped input', () => <GroupedWrapper />)
  .add('grouped input empty', () => <GroupedWrapper empty />)
  .add('grouped input empty error', () => (
    <GroupedWrapper empty error="Não deve estar vazio" />
  ));
