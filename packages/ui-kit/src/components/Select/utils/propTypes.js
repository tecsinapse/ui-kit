import PropTypes from 'prop-types';

export const defaultProps1 = {
  allowSelectAll: true,
  fullWidth: false,
  portal: false,
  variant: 'auto',
  success: false,
  warning: false,
  disabled: false,
  isMulti: false,
  label: null,
  onChange: null,
  onBlur: null,
  error: null,
  touched: false,
  selectPromptMessage: 'Selecione',
  selectAllMessage: 'Selecionar todos',
  minWidth: '200px',
  customIndicators: undefined,
  customTextField: {},
};

export const propTypes1 = {
  /** Show 'select' option to select all options */
  allowSelectAll: PropTypes.bool,
  /** Fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Disable Select */
  disabled: PropTypes.bool,
  /** Sucess input variant */
  success: PropTypes.bool,
  /** Warning input variant */
  warning: PropTypes.bool,
  /** Turn multi-selection on */
  isMulti: PropTypes.bool,
  /** Device Select variant view */
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  /** Select is touched */
  touched: PropTypes.bool,
  portal: PropTypes.bool,
  /** Error message/variant */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Input label */
  label: PropTypes.string,
  /** Options available to Select */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Fired when change event */
  onChange: PropTypes.func,
  /** Fired when blur event */
  onBlur: PropTypes.func,
  /** Select prompt placeholder */
  selectPromptMessage: PropTypes.string,
  /** Select all placeholder */
  selectAllMessage: PropTypes.string,
  /** Minimum element width */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Custom action placed on '`Select all`' line for multi select. The `buttonIcon` prop must be a mdi valid icon. `buttonColor` and `buttonVariant` are material-ui equivalent props. */
  customAction: PropTypes.shape({
    buttonLabel: PropTypes.string.isRequired,
    buttonColor: PropTypes.oneOf(['primary', 'secondary']),
    buttonVariant: PropTypes.oneOf(['contained', 'text', 'outlined']),
    buttonIcon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    handleClick: PropTypes.func.isRequired,
  }),
  /** Custom indicators to be placed as adornment */
  customIndicators: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  /** Customize text field behind select */
  customTextField: PropTypes.object,
};
