import 'date-fns';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { ColorPicker } from './ColorPicker';
import { PickersProvider } from './PickersProvider';

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
      />
    </PickersProvider>
  );
};

storiesOf(`${GROUPS.FORMS}|Picker`, module)
  .add('Date Picker', () => <DatePickerStory />)
  .add('Color Picker', () => (
    <ColorPicker
      name="color"
      defaultValue="#000"
      // value={this.state.color} - for controlled component
      // onChange={color => console.log(color)}
    />
  ))
  .add('Time Picker', () => <TimePickerStory />);
