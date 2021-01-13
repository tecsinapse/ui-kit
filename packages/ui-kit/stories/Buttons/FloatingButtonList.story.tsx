import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import { FloatingButtonList, FloatingButton } from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Button/Floating/List`,
  component: FloatingButtonList,
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
            The `FloatingButtonList` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [open, setOpen] = React.useState(args.open);

  return (
    <FloatingButtonList
      onClick={() => {
        action('onClick')();
        setOpen(!open);
      }}
      open={open}
      items={[
        {
          text: 'Absoluto',
          component: (
            <FloatingButton key="absoluto" color="secondary">
              1
            </FloatingButton>
          ),
        },
        {
          text: 'Absoluto 2',
          component: (
            <FloatingButton key="absoluto2" color="secondary">
              2
            </FloatingButton>
          ),
        },
      ]}
    />
  );
};

Base.args = {
  open: true,
};
