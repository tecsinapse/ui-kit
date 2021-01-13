import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { TimePicker } from 'Picker/TimePicker/TimePicker';
import { PickersProvider } from 'Picker/PickersProvider/PickersProvider';
import { action } from '@storybook/addon-actions';

export default {
  title: `Packages @tecsinapse/pickers/Time Picker`,
  component: TimePicker,
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

export const Base = args => {
  const [selectedTime, setSelecteTime] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <TimePicker
        {...args}
        selectedTime={selectedTime}
        onChange={time => {
          action('onChange')(time);
          setSelecteTime(time);
        }}
      />
    </PickersProvider>
  );
};
