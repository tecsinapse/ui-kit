import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { DatePicker } from 'Picker/DatePicker/DatePicker';
import { PickersProvider } from 'Picker/PickersProvider/PickersProvider';
import { Typography } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { add, format } from 'date-fns';

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
            `datefns`. By default, `@tecsinapse/pickers` have a `date-fns`
            provider that you can import.
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <PickersProvider>
      <DatePicker
        {...args}
        selectedDate={selectedDate}
        onChange={date => {
          action('onChange')(date);
          setSelectedDate(date);
        }}
        pointedDates={[add(selectedDate, { days: 3 })]}
      />
    </PickersProvider>
  );
};

Base.args = {
  format: 'dd/MM/yyyy',
};

export const CustomInput = args => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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
            {format(selectedDate, 'MM, yyyy')}
          </Typography>
        )}
      />
    </PickersProvider>
  );
};

CustomInput.args = {
  format: 'dd/MM/yyyy',
};
