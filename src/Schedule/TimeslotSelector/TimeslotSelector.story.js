/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Typography } from '@material-ui/core';

import { TimeslotSelector } from './TimeslotSelector';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import { Button } from '../..';

const personsAvailabilities = require('../../../test/resources/availabilities.json');

const onHandleScheduleTest = selected =>
  alert(
    `Usuário: ${selected.email}\nData: ${selected.date}\nHora: ${
      selected.time
    }\n`
  );

const style = {
  border: 'solid gray 1px',
  height: '100%',
};

const customSteps = [
  {
    label: 'Empresas',
    component: ({ key, callNextStep }) => (
      <div key={key}>
        <Typography variant="h4">Empresas</Typography>
        <Button onClick={callNextStep} variant="secondary">
          Próximo
        </Button>
      </div>
    ),
  },
];

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module)
  .add('TimeslotSelector', () => (
    <TimeslotSelector
      style={style}
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
    />
  ))
  .add('Modal TimeslotSelector', () => (
    <div style={{ height: '90vh', ...style }}>
      <TimeslotSelector
        style={style}
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
    </div>
  ))
  .add('TimeslotSelector custom steps', () => (
    <TimeslotSelector
      beforeSteps={customSteps}
      style={style}
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration={20}
      defaultSelectAllPerson
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
    />
  ));
