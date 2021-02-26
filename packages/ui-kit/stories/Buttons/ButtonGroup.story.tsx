import * as React from 'react';
import { ButtonGroup } from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Description, Title, ArgsTable } from '@storybook/addon-docs/blocks';

export default {
  title: `${GROUPS.COMPONENTS}/Button/Group`,
  component: ButtonGroup,
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
            Each Button component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <ButtonGroup {...args} />;

Base.args = {
  labels: [
    { label: 'Button1', onClick: () => {}, active: false },
    { label: 'Button2', onClick: () => {}, active: false },
    { label: 'Button3', onClick: () => {}, active: false },
  ],
};
