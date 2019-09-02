/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';

import { WeeklyCalendar } from './WeeklyCalendar';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.CALENDAR}|Calendar`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Weekly', () => (
    <WeeklyCalendar
      onDayChange={day => {
        console.info('onDayChange: ', day && day.toISODate());
      }}
      onWeekChange={weekDays => {
        console.info('onWeekChange: ', weekDays);
      }}
      currentDate={DateTime.local()}
    />
  ));
