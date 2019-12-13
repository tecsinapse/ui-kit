import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { ColorPicker } from './ColorPicker';
import { PickersProvider } from './PickersProvider';
import { DateTimePicker } from './DateTimePicker';
import { DivFlex } from '../withFlexCenter';

const DatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    moment('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DatePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="DD[/]MM[/]YYYY  HH[:]mm"
        name="datetimepicker"
        pointedDates={[moment('2014-08-25T09:08:34.123')]}
        minDate={moment('2014-08-18T21:11:54')}
      />
    </PickersProvider>
  );
};

const CustomLabelDatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    moment('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DatePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="DD[/]MM[/]YYYY  HH[:]mm"
        name="customdatepicker"
        customTextFieldComponentInput={() => (
          <Typography variant="h6" color="secondary">
            {selectedDate.setLocale('pt-BR').format('MMMM, yyyy')}
          </Typography>
        )}
      />
    </PickersProvider>
  );
};

const WeeklyDatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DatePicker
        weekly
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="DD[/]MM[/]YYYY  HH[:]mm"
        name="datepicker"
      />
    </PickersProvider>
  );
};

const TimePickerStory = () => {
  const [selectedTime, setSelecteTime] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <TimePicker
        selectedTime={selectedTime}
        onChange={time => setSelecteTime(time)}
        name="timepicker"
      />
    </PickersProvider>
  );
};

const DateTimePickerStory = () => {
  const [selectedDateTime, setSelecteDatetime] = React.useState(
    moment('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DateTimePicker
        selectedDateTime={selectedDateTime}
        onChange={dateTime => setSelecteDatetime(dateTime)}
        name="datetimepicker"
      />
    </PickersProvider>
  );
};

storiesOf(`${GROUPS.FORMS}|Picker`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Date Picker', () => <DatePickerStory />)
  .add('Date Time Picker', () => <DateTimePickerStory />)
  .add('Custom Text Input Date Picker', () => <CustomLabelDatePickerStory />)
  .add('Weekly Date Picker', () => <WeeklyDatePickerStory />)
  .add('Color Picker', () => (
    <ColorPicker name="color" defaultValue="#000" label="Color Picker" />
  ))
  .add('Time Picker', () => <TimePickerStory />);
