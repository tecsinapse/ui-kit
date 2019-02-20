/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TimeslotSelector from './TimeslotSelector';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

const personsAvailabilities = require('../../../test/resources/availabilities.json');

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module)
  .add('TimeslotSelector', () => (
    <TimeslotSelector
      style={{ width: 600 }}
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={obj => console.log(obj)}
    />
  ))
  .add('Modal TimeslotSelector', () => (
    <TimeslotSelector
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      dialog
      dialogProps={{ open: true }}
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={obj => console.log(obj)}
    />
  ));