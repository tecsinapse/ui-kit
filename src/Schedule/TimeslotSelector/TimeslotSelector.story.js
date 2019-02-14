/* eslint-disable no-console */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import { TimeslotSelector } from './TimeslotSelector';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module).add(
  'TimeslotSelector',
  () => (
    <Paper>
      <TimeslotSelector
        step1Label="Selecione o Consultor"
        step2Label="Selecione o horário"
      />
    </Paper>
  )
);
