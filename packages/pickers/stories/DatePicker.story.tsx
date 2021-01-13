import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { DatePicker } from 'Picker/DatePicker/DatePicker';
import { PickersProvider } from 'Picker/PickersProvider/PickersProvider';
import { DateTime } from 'luxon';
import { Typography } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

export default {
  title: `Packages @tecsinapse/pickers/Date Picker`,
  component: DatePicker,
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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DatePicker
        {...args}
        selectedDate={selectedDate}
        onChange={date => {
          action('onChange')(date);
          setSelectedDate(date);
        }}
        pointedDates={[DateTime.fromISO('2014-08-25T09:08:34.123')]}
      />
    </PickersProvider>
  );
};

Base.args = {
  format: 'dd/MM/yyyy',
};

export const CustomInput = args => {
  const [selectedDate, setSelectedDate] = React.useState(
    DateTime.fromISO('2019-08-25T09:08:34.123')
  );

  return (
    <PickersProvider>
      <DatePicker
        {...args}
        selectedDate={selectedDate}
        onChange={date => {
          action('onChange')(date);
          setSelectedDate(date);
        }}
        customTextFieldComponentInput={() => (
          <Typography variant="h6" color="secondary">
            {selectedDate.setLocale('pt-BR').toFormat('MMMM, yyyy')}
          </Typography>
        )}
      />
    </PickersProvider>
  );
};

CustomInput.args = {
  format: 'dd/MM/yyyy',
};
