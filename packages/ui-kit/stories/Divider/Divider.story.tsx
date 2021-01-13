import * as React from 'react';
import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { Divider } from 'components/Divider';
import { DivFlex } from 'components/DivFlex';

export default {
  title: `${GROUPS.LAYOUT}/Divider`,
  component: Divider,
  decorators: [
    Story => (
      <DivFlex>
        <div style={{ margin: 'auto', width: '50%', paddingTop: '5vh' }}>
          <Story />
        </div>
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `Divider` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <Divider {...args} />;

Base.args = {
  variant: 'dashed',
};
