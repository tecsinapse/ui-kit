import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { useManualQuery } from 'graphql-hooks';
import {
  Description,
  Props,
  Source,
  Title,
} from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import { AutoComplete } from './AutoComplete';
import { DivFlex } from '../DivFlex/DivFlex';

const style = { width: '300px' };

const CONTINENTS_QUERY = `query continents {
	continents {
		code
	  name
	}
}`;

const options = fetch => async inputValue => {
  const {
    data: { continents },
  } = await fetch();

  return continents
    .map(continent => ({
      id: continent.code,
      label: continent.name,
    }))
    .filter(continent =>
      continent.label.toLowerCase().startsWith(inputValue.toLowerCase())
    );
};

const AutoCompleteExample = () => {
  const [values, setValues] = useState([]);
  const [fetch] = useManualQuery(CONTINENTS_QUERY);
  const handleDelete = value =>
    setValues(oldValues => oldValues.filter(v => v.id !== value.id));
  const handleSelect = suggestion =>
    setValues(oldValues => [...oldValues, suggestion]);

  return (
    <div style={style}>
      <AutoComplete
        options={options(fetch)}
        values={values}
        onDeleteItem={handleDelete}
        onSelectItem={handleSelect}
        inputProps={{
          label: 'Search for continents',
        }}
      />
    </div>
  );
};

storiesOf(`${GROUPS.FORMS}/Autocomplete`, module)
  .addParameters({
    component: AutoComplete,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `AutoComplete` component can receive the following props:
          </Description>
          <Props />
          <Title>Code snippets</Title>
          <Description>
            Here you can check the code snippet for the story.
          </Description>
          <Source
            code={`
              () => {
                const [values, setValues] = useState([]);
                const [fetch] = useManualQuery(CONTINENTS_QUERY);
                const handleDelete = value => setValues(oldValues => oldValues.filter(v => v.id !== value.id));
                const handleSelect = suggestion => setValues(oldValues => [...oldValues, suggestion]);

                return (
                  <div style={{ width: '300px' }}>
                    <AutoComplete
                      options={options(fetch)}
                      values={values}
                      onDeleteItem={handleDelete}
                      onSelectItem={handleSelect}
                      inputProps={{
                        label: 'Search for continents',
                      }}
                    />
                  </div>
                );
              }
            `}
          />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Autocomplete', () => <AutoCompleteExample />);
