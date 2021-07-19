import React, { useState } from 'react'
import { ArgsTable, Title, Description} from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { Checkbox } from 'components/Checkbox'
import { DivFlex } from 'components/DivFlex'
import {
  LocationOff,
  LocationOn,
  PhoneDisabled,
  PhoneEnabled,
  RadioButtonCheckedRounded,
  RadioButtonUncheckedRounded,
  Star,
  StarOutlined
} from "@material-ui/icons";

export default {
  title: `${GROUPS.FORMS}/Checkbox`,
  component: Checkbox,
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
            <Description>The `Checkbox` component can receive the following props:</Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [state, setState] = useState(args.options)

  const handleChange = (event, index) => {
    state[index].checked = event.target.checked
    setState(state)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {state && state.map((item, index) => (
        <Checkbox {...item} key={index} index={index} handleChange={handleChange} />
      ))}
    </div>
  )
};

Base.args = {
  options: [
    {
      label: 'Option 1',
      checked: true
    },
    {
      icon: <LocationOff/>,
      checked: true,
      checkedIcon: <LocationOn color='secondary'/>,
      color: 'primary',
      label: 'Enable/Disable Location'
    },
    {
      icon: <PhoneDisabled/>,
      checked: true,
      checkedIcon: <PhoneEnabled color='secondary'/>,
      color: 'primary',
      label: 'Enable/Disable Phone'
    },
    {
      icon: <RadioButtonUncheckedRounded/>,
      checked: true,
      checkedIcon: <RadioButtonCheckedRounded color='secondary'/>,
      color: 'primary',
      label: 'Enable/Disable Property'
    },
    {
      icon: <StarOutlined/>,
      checked: true,
      checkedIcon: <Star color='secondary'/>,
      color: 'primary',
      label: 'Mark/Unmark Favorite'
    }
  ]
}
