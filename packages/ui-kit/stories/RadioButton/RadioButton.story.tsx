import * as React from 'react';
import { RadioButton } from 'components/RadioButton';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Description, Title, ArgsTable } from '@storybook/addon-docs/blocks';

export default {
  title: `${GROUPS.COMPONENTS}/RadioButton`,
  component: <h1>Ola</h1>,
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
            RadioButton component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = () => <h1>Ola</h1>;

Base.args = {
}

