import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { DateTimePicker } from 'Picker/DateTimePicker/DateTimePicker';
import { PickersProvider } from 'Picker/PickersProvider/PickersProvider';
import { action } from '@storybook/addon-actions';

export default {
  title: `Packages @tecsinapse/pickers/Date Time Picker`,
  component: DateTimePicker,
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
  const [selectedDateTime, setSelecteDatetime] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DateTimePicker
        {...args}
        selectedDateTime={selectedDateTime}
        onChange={dateTime => {
          action('onChange')(dateTime);
          setSelecteDatetime(dateTime);
        }}
      />
    </PickersProvider>
  );
};
