import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { AutoComplete } from 'components/AutoComplete';

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
const [fetch] = CONTINENTS_QUERY;

test('Render Auto Complete', () => {
  const { container, getByLabelText } = render(
    <TestProvider>
      <AutoComplete
        options={options(fetch)}
        values={[]}
        onDeleteItem={() => {}}
        onSelectItem={() => {}}
        inputProps={{
          label: 'Search for continents',
        }}
      />
    </TestProvider>
  );
  const element = getByLabelText('Search for continents');

  expect(container).toContainElement(element);
});
