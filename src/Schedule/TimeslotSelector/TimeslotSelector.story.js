/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { TimeslotSelector } from './TimeslotSelector';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

const personsAvailabilities = require('../../../test/resources/availabilities.json');

const onHandleScheduleTest = selected =>
  alert(
    `Usuário: ${selected.email}\nData: ${selected.date}\nHora: ${
      selected.time
    }\n`
  );

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module)
  .add('TimeslotSelector', () => (
    <TimeslotSelector
      style={{ width: 600 }}
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
    />
  ))
  .add('Modal TimeslotSelector', () => (
    <TimeslotSelector
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      dialog
      openOpened
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
      onCloseDialog={() => {}}
    />
  ));
