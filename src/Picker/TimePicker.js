import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

export const TimePicker = ({ selectedDate, id, label, onChange }) => (
  <KeyboardTimePicker
    margin="normal"
    id={id}
    label={label}
    value={selectedDate}
    onChange={onChange}
    KeyboardButtonProps={{
      'aria-label': 'change time',
    }}
  />
);
