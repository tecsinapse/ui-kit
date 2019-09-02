/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TimeslotSelector from './TimeslotSelector';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import { Button, Input } from '../..';
import { DivFlex } from '../../withFlexCenter';

const personsAvailabilities = require('../../../test/resources/availabilities.json');

const personsEmailSelected = personsAvailabilities.map(p => p.email);

const selectedEmailPerson = 'ricardo.almeida@example.com.br';
const selectedDate = '2019-02-12';
const selectedTime = '08:00';

const onHandleScheduleTest = selected => {
  alert(
    `Usuário: ${selected.email}\nData: ${selected.date}\nHora: ${selected.time}\n`
  );
};

const style = {
  border: 'solid gray 1px',
  height: '100%',
};

const customSteps = [
  {
    label: 'Empresas',
    component: ({ key, callNextStep, changeOtherProps, otherProps }) => (
      <div key={key}>
        <Typography variant="h4">Empresas</Typography>
        <Input
          label="Empresa"
          value={otherProps.empresa}
          fullWidth
          onChange={event =>
            changeOtherProps
              ? changeOtherProps('empresa', event.target.value)
              : () => {}
          }
        />
        <Divider style={{ margin: 8 }} />
        <Button onClick={callNextStep} variant="secondary" s>
          Próximo
        </Button>
      </div>
    ),
  },
];

storiesOf(`${GROUPS.SCHEDULE}|TimeslotSelector`, module)
  .addDecorator(story => (
    <DivFlex style={{ maxWidth: '500px', margin: '0 auto' }}>{story()}</DivFlex>
  ))
  .add('TimeslotSelector', () => (
    <TimeslotSelector
      style={style}
      personsAvailabilities={personsAvailabilities}
      selectedEmailPerson={selectedEmailPerson}
      durations={[15, 20, 30]}
      defaultDuration="20"
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
      personsEmailSelected={personsEmailSelected}
      selectedTime={selectedTime}
      selectedDate={selectedDate}
    />
  ))
  .add('Modal TimeslotSelector', () => (
    <div style={{ height: '90vh', ...style }}>
      <TimeslotSelector
        style={style}
        personsAvailabilities={personsAvailabilities}
        selectedEmailPerson={selectedEmailPerson}
        durations={[15, 20, 30]}
        defaultDuration="20"
        dialog
        openOpened
        onWeekChange={obj => console.log(obj)}
        onHandleSchedule={onHandleScheduleTest}
        onCloseDialog={() => {}}
        personsEmailSelected={personsEmailSelected}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
      />
    </div>
  ))
  .add('TimeslotSelector custom steps', () => (
    <TimeslotSelector
      beforeSteps={customSteps}
      style={style}
      personsAvailabilities={personsAvailabilities}
      durations={[15, 20, 30]}
      defaultDuration="20"
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
      personsEmailSelected={personsEmailSelected}
      selectedTime={selectedTime}
      selectedDate={selectedDate}
    />
  ));
