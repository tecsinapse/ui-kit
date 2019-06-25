import 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GROUPS } from '../../.storybook/hierarchySeparators';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';

const DatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
      <DatePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

const TimePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
      <TimePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

storiesOf(`${GROUPS.FORMS}|Picker`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('Date Picker', () => <DatePickerStory />)
  .add('Time Picker', () => <TimePickerStory />);
