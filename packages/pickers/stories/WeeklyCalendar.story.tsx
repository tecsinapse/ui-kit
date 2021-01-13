import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { WeeklyCalendar } from 'Calendar/WeeklyCalendar';
import { DateTime } from 'luxon';
import { action } from '@storybook/addon-actions';

export default {
  title: `Packages @tecsinapse/pickers/Week Calendar`,
  component: WeeklyCalendar,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The Weekly Calendar component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => (
  <WeeklyCalendar
    {...args}
    onDayChange={action('onDayChange')}
    onWeekChange={action('onWeekChange')}
    currentDate={DateTime.local()}
  />
);
