import { shallow } from 'enzyme';
import React from 'react';
import { Button } from '../src/Buttons/Button';

test('Button should render and be clickable', () => {
  let variable = false;
  const component = shallow(
    <Button
      onClick={() => {
        variable = true;
      }}
    >
      Facebook
    </Button>
  );
  expect(component).toMatchSnapshot();
  component.simulate('click');
  expect(variable).toBe(true);
});
