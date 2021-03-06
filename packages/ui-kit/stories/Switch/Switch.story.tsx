import * as React from 'react';
import { Switch } from 'components/Switch';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Description, Title, ArgsTable } from '@storybook/addon-docs/blocks';

export default {
  title: `${GROUPS.COMPONENTS}/Switch`,
  component: Switch,
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
            Switch component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};


export const Base = args => <Switch {...args}/>;

Base.args = {

  /** labels (left, right) switch */
  labels: {
    right: 'On',
    left: 'Off'
  },
  /**function onChange switch */
  onChange: () => {},
  /** Switch size */
  size: 'medium',
  /** color switch*/
  color: 'secondary'
}

