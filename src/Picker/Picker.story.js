import React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from '@material-ui/core/Typography';
import DateTime from 'luxon/src/datetime';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { ColorPicker } from './ColorPicker';
import { PickersProvider } from './PickersProvider';
import { DateTimePicker } from './DateTimePicker';

const DatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  return (
    <PickersProvider>
      <DatePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="dd/MM/yyyy"
        name="datetimepicker"
        pointedDates={[DateTime.fromISO('2014-08-25T09:08:34.123')]}
      />
    </PickersProvider>
  );
};

const CustomLabelDatePickerStory = () => {
  const [selectedDate, setSelectedDate] = React.useState(DateTime.fromISO(''));

  return (
    <PickersProvider>
      <DatePicker
        selectedDate={selectedDate}
        onChange={date => setSelectedDate(date)}
        format="dd/MM/yyyy"
        name="customdatepicker"
        customTextFieldComponentInput={() => (
          <Typography variant="h6" color="primary">
            {DateTime.fromObject(selectedDate)
              .setLocale('pt-BR')
              .toFormat('MMMM, yyyy')}
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
        format="dd/MM/yyyy"
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
    new Date('2014-08-18T21:11:54')
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
  .add('Date Picker', () => <DatePickerStory />)
  .add('Date Time Picker', () => <DateTimePickerStory />)
  .add('Custom Text Input Date Picker', () => <CustomLabelDatePickerStory />)
  .add('Weekly Date Picker', () => <WeeklyDatePickerStory />)
  .add('Color Picker', () => (
    <ColorPicker
      name="color"
      defaultValue="#000"
      label="Color Picker"
      // value={this.state.color} - for controlled component
      // onChange={color => console.log(color)}
    />
  ))
  .add('Time Picker', () => <TimePickerStory />);
