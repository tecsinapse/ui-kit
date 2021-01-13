import * as React from 'react';
import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import { EmptyState } from 'components/EmptyState';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import FolderOpen from '@material-ui/icons/FolderOpen';

export default {
  title: `${GROUPS.LAYOUT}/Empty State`,
  component: EmptyState,
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
            The `EmptyState` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <EmptyState {...args} />;

Base.args = {
  IconComponent: FolderOpen,
};
