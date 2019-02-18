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
    <Paper>
      <TimeslotSelector personsAvailabilities={personsAvailabilities} />
    </Paper>
  )
);
