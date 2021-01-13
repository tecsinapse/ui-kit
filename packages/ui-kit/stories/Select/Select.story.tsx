import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { Select } from 'components/Select';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { mdiPlus, mdiEye } from '@mdi/js';
import Icon from '@mdi/react';
import { IconButton } from 'components/Buttons';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.FORMS}/Select`,
  component: Select,
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
            The `Select` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

const options = [
  {
    value: 'a',
    label: 'A',
  },
  {
    value: 'b',
    label: 'BBBBBB',
  },
  {
    value: 'c',
    label: 'CCCCCCCCCC',
  },
];

export const Base = args => {
  const [value, setValue] = React.useState('');

  return (
    <Select
      {...args}
      value={value}
      options={options}
      onChange={param => {
        action('onChange')(param);
        setValue(param);
      }}
    />
  );
};

Base.args = {
  label: 'Placeholder',
  isMulti: false,
  allowSelectAll: false,
};

export const CustomAction = args => {
  const [value, setValue] = React.useState([null]);
  return (
    <Select
      {...args}
      value={value}
      options={options}
      onChange={param => {
        action('onChange')(param);
        setValue(param);
      }}
      customAction={{
        buttonLabel: 'Nova ação',
        handleClick: action('Custom Action Click'),
        buttonIcon: mdiPlus,
      }}
    />
  );
};

CustomAction.args = {
  placeholder: 'select your destiny',
  menuPlacement: 'top',
  label: 'Placeholder',
  isMulti: true,
  minWidth: 350,
};

export const CustomIndicator = args => {
  const [value, setValue] = React.useState([null]);
  return (
    <Select
      {...args}
      value={value}
      options={options}
      onChange={param => {
        action('onChange')(param);
        setValue(param);
      }}
      customIndicators={
        <IconButton onClick={action('Indicator Click')}>
          <Icon path={mdiEye} size={1} color="grey" />
        </IconButton>
      }
    />
  );
};

CustomIndicator.args = {
  placeholder: 'select your destiny',
  menuPlacement: 'top',
  label: 'Placeholder',
  isMulti: true,
  minWidth: 350,
  error: 'Example error message',
};
