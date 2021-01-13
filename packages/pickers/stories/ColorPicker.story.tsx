import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { ColorPicker } from 'Picker/ColorPicker/ColorPicker';
import { action } from '@storybook/addon-actions';

export default {
  title: `Packages @tecsinapse/pickers/Color Picker`,
  component: ColorPicker,
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
            There are several types of Picker components. To use these pickers,
            you have to specify a date provider like `moment`, `luxon` or
            `datefns`. By default, `@tecsinapse/pickers` have a `luxon` provider
            that you can import.
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <ColorPicker {...args} />;

Base.args = {
  name: 'color',
  defaultValue: '#000',
  label: 'Color Picker',
  onChange: action('onChange'),
};
