import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import FileCopyRounded from '@material-ui/icons/FileCopyRounded';
import { DivButton } from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Button/Div`,
  component: DivButton,
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
            The `DivButton` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const style = {
    width: '25vw',
    height: '100px',
    backgroundColor: '#e0e0e0',
  };

  return (
    <div style={style}>
      <DivButton {...args}>
        <FileCopyRounded fontSize="large" />
      </DivButton>
    </div>
  );
};

Base.args = {
  onClick: action('onClick'),
  infoText: 'COMUNICADOS',
  notifyNumber: 1,
};
