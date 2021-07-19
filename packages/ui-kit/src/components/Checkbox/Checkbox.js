import React, { useState } from 'react'
import { Checkbox as Check, FormControlLabel } from '@material-ui/core'
import PropTypes from 'prop-types'

export const Checkbox = ({
  checked,
  checkedIcon,
  color,
  disabled,
  disableRipple,
  handleChange,
  id,
  index,
  icon,
  indeterminate,
  indeterminateIcon,
  label,
  labelPlacement
}) => {
  const [check, setCheck] = useState(checked)

  const toggleCheck = () => {
    setCheck(!check)
  }

  return (
    <FormControlLabel
      control={
        <Check
          checked={check}
          checkedIcon={checkedIcon}
          color={color}
          disableRipple={disableRipple}
          onChange={(event) => {
            toggleCheck()
            handleChange(event, index)
          }}
          id={id}
          icon={icon}
          indeterminate={indeterminate}
          indeterminateIcon={indeterminateIcon}
        />
      }
      disabled={disabled}
      label={label}
      labelPlacement={labelPlacement}
    />
  )
}

Checkbox.propTypes = {
  /** Defines if the component is checked or not. */
  checked: PropTypes.bool,
  /** Defines the component checked icon. */
  checkedIcon: PropTypes.node,
  /** Defines the component theme color. */
  color: PropTypes.string,
  /** Defines if the component is disabled. */
  disabled: PropTypes.bool,
  /** Disable the ripple effect when component is clicked. */
  disableRipple: PropTypes.bool,
  /** defines the callback function that is triggered when component is changed. */
  handleChange: PropTypes.func,
  /** Defines the component id. */
  id: PropTypes.string,
  /** Defines the component index. */
  index: PropTypes.string,
  /** Defines the component icon. */
  icon: PropTypes.node,
  /** Defines if the component is indeterminate. */
  indeterminate: PropTypes.bool,
  /** Defines the component indeterminate icon. */
  indeterminateIcon: PropTypes.node,
  /** Defines the component label. */
  label: PropTypes.string,
  /** Defines the component place. Possible values are: "start" and "end". */
  labelPlacement: PropTypes.oneOf(['start', 'end'])
}
