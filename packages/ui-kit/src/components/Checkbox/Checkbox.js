import React, { useState } from 'react'
import { Checkbox as Check, FormControlLabel } from '@material-ui/core'
import PropTypes from 'prop-types'

export const Checkbox = ({
  checked,
  checkedIcon,
  disabled,
  disableRipple,
  handleChange,
  id,
  indeterminate,
  indeterminateIcon,
  label,
  labelPlacement,
  required
}) => {
  const [check, setCheck] = useState(checked)

  function toggleCheck() {
    setCheck(!check)
  }

  return (
    <FormControlLabel
      control={
        <Check
          checked={check}
          checkedIcon={checkedIcon}
          disabled={disabled}
          disableRipple={disableRipple}
          id={id}
          indeterminate={indeterminate}
          indeterminateIcon={indeterminateIcon}
          onClick={() => toggleCheck()}
          onChange={(event) => handleChange(event)}
          required={required}
          value={check}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
      onClick={() => toggleCheck()}
    />
  )
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  disableRipple: false,
  indeterminate: false,
  labelPlacement: 'end',
  required: false
}

Checkbox.propTypes = {
  /** Defines if the component is checked or not. */
  checked: PropTypes.bool,
  /** Defines the component checked icon. */
  checkedIcon: PropTypes.node,
  /** Defines if the component is disabled. */
  disabled: PropTypes.bool,
  /** Disable the ripple effect when component is clicked. */
  disableRipple: PropTypes.bool,
  /** defines the callback function that is triggered when component is changed. */
  handleChange: PropTypes.func,
  /** Defines the component id. */
  id: PropTypes.string,
  /** Defines if the component is indeterminate. */
  indeterminate: PropTypes.bool,
  /** Defines the component indeterminate icon. */
  indeterminateIcon: PropTypes.node,
  /** Defines the component label. */
  label: PropTypes.string,
  /** Defines the component place. Possible values are: "top", "start", "bottom" and "end". */
  labelPlacement: PropTypes.string,
  /** Defines if the component are required or not. */
  required: PropTypes.bool
}
