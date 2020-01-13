import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
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
          const newArray = [...v];
          newArray.splice(index, 1);
          return newArray;
        });
      }}
      push={() => setValues(v => [...v, ''])}
      hr
    />
  );
}

storiesOf(`${GROUPS.FORMS}|Grouped Input`, module)
  .addParameters({
    component: GroupedInput,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `GroupedInput` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .add('grouped input', () => <GroupedWrapper />)
  .add('grouped input empty', () => <GroupedWrapper empty />)
  .add('grouped input empty error', () => (
    <GroupedWrapper empty error="Não deve estar vazio" />
  ));
