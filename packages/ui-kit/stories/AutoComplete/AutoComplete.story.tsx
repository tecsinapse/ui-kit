import * as React from 'react';
import { useManualQuery } from 'graphql-hooks';
import {
  Description,
  ArgsTable,
  Title,
} from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from 'hierarchySeparators';
import { AutoComplete } from 'components/AutoComplete';
import { DivFlex } from 'components/DivFlex';
import { action } from '@storybook/addon-actions';

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

export default {
  title: `${GROUPS.FORMS}/Auto Complete`,
  component: AutoComplete,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `AutoComplete` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [values, setValues] = React.useState([]);
  const [fetch] = useManualQuery(CONTINENTS_QUERY);
  const handleDelete = value => {
    action('onDeleteItem')(value);
    setValues(oldValues => oldValues.filter(v => v.id !== value.id));
  };
  const handleSelect = suggestion => {
    action('onSelectItem')(suggestion);
    setValues(oldValues => [...oldValues, suggestion]);
  };

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
        {...args}
      />
    </div>
  );
};
