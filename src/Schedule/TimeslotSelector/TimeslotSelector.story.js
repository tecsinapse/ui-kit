/* eslint-disable no-console */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import TimeslotSelector from './TimeslotSelector';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

const personsAvailabilities = require('../../../test/resources/availabilities.json');

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module).add(
  'TimeslotSelector',
  () => (
    <Paper style={{ width: 600 }}>
      <TimeslotSelector
        personsAvailabilities={personsAvailabilities}
        durations={[15, 20, 30]}
        defaultDuration={20}
        defaultSelectAllPerson
      />
    </Paper>
  )
);
