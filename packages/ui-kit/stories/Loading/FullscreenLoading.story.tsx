import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { FullScreenLoading } from 'components/Loading';

export default {
  title: `${GROUPS.LOADINGS}/Fullscreen Loading`,
  component: FullScreenLoading,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `FullScreenLoading` component receive only one prop named as
            `show` to display the spinning circle.
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <FullScreenLoading {...args} />;

Base.args = {
  show: true,
};
