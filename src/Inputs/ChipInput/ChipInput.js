// disabling eslint for file because:
// file is from external library, only making small changes

/**
 * Notice: Some code was adapted from Material-UI's text field.
 * And From  Call-Em-All (https://github.com/callemall/material-ui)
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import { chipInputStyles } from './chipInputStyles';

export const keyCodes = {
  BACKSPACE: 8,
  DELETE: 46,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

class ChipInput extends React.Component {
  state = {
    chips: [],
    focusedChip: null,
    inputValue: '',
    isFocused: false,
    prevPropsValue: [],
  };

  constructor(props) {
    super(props);
    if (props.defaultValue) {
      this.state.chips = props.defaultValue;
    }
    this.labelRef = React.createRef();
    this.input = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.labelNode = ReactDOM.findDOMNode(this.labelRef.current);
    this.forceUpdate();
  }

  componentWillUnmount() {
    clearTimeout(this.inputBlurTimeout);
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (props.value && props.value.length !== state.prevPropsValue.length) {
      newState = { prevPropsValue: props.value };
      if (props.clearInputValueOnChange) {
        newState.inputValue = '';
      }
    }

    // if change detection is only needed for clearInputValueOnChange
    if (
      props.clearInputValueOnChange &&
      props.value &&
      props.value.length !== state.prevPropsValue.length
    ) {
      newState = { prevPropsValue: props.value, inputValue: '' };
    }

    if (props.disabled) {
      newState = { ...newState, focusedChip: null };
    }

    return newState;
  }

  /**
   * Focuses this component.
   * @public
   */
  focus = () => {
    this.actualInput.focus();
    const { focusedChip } = this.state;
    if (focusedChip != null) {
      this.setState({ focusedChip: null });
    }
  };

  handleInputBlur = event => {
    const { onBlur, blurBehavior, delayBeforeAdd, value, chips } = this.props;
    const { focusedChip } = this.state;
    if (onBlur) {
      onBlur(event);
    }
    this.setState({ isFocused: false });
    if (focusedChip != null) {
      this.setState({ focusedChip: null });
    }
    const { value: eventValue } = event.target;
    switch (blurBehavior) {
      case 'add':
        if (delayBeforeAdd) {
          // Lets assume that we only want to add the existing content as chip, when
          // another event has not added a chip within 200ms .
          // e.g. onSelection Callback in Autocomplete case
          const numChipsBefore = (value || chips).length;
          this.inputBlurTimeout = setTimeout(() => {
            const numChipsAfter = (value || chips).length;
            if (numChipsBefore === numChipsAfter) {
              this.handleAddChip(eventValue);
            } else {
              this.clearInput();
            }
          }, 150);
        } else {
          this.handleAddChip(value);
        }
        break;
      case 'clear':
        this.clearInput();
        break;
      default:
        break;
    }
  };

  handleInputFocus = event => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus(event);
    }
  };

  handleKeyDown = event => {
    const { focusedChip, chips: oldChips } = this.state;
    const { onKeyDown, value, newChipKeyCodes } = this.props;
    this._keyPressed = false;
    this._preventChipCreation = false;
    if (onKeyDown) {
      // Needed for arrow controls on menu in autocomplete scenario
      onKeyDown(event);
      // Check if the callback marked the event as isDefaultPrevented() and skip further actions
      // enter key for example should not always add the current value of the inputField
      if (event.isDefaultPrevented()) {
        return;
      }
    }
    const chips = value || oldChips;
    if (newChipKeyCodes.indexOf(event.keyCode) >= 0) {
      const result = this.handleAddChip(event.target.value);
      if (result !== false) {
        event.preventDefault();
      }
      return;
    }

    switch (event.keyCode) {
      case keyCodes.BACKSPACE:
        if (event.target.value === '') {
          if (focusedChip != null) {
            this.handleDeleteChip(chips[focusedChip], focusedChip);
            if (focusedChip > 0) {
              this.setState({ focusedChip: focusedChip - 1 });
            }
          } else {
            this.setState({ focusedChip: chips.length - 1 });
          }
        }
        break;
      case keyCodes.DELETE:
        if (event.target.value === '' && focusedChip != null) {
          this.handleDeleteChip(chips[focusedChip], focusedChip);
          if (focusedChip <= chips.length - 1) {
            this.setState({ focusedChip });
          }
        }
        break;
      case keyCodes.LEFT_ARROW:
        if (focusedChip == null && event.target.value === '' && chips.length) {
          this.setState({ focusedChip: chips.length - 1 });
        } else if (focusedChip != null && focusedChip > 0) {
          this.setState({ focusedChip: focusedChip - 1 });
        }
        break;
      case keyCodes.RIGHT_ARROW:
        if (focusedChip != null && focusedChip < chips.length - 1) {
          this.setState({ focusedChip: focusedChip + 1 });
        } else {
          this.setState({ focusedChip: null });
        }
        break;
      default:
        this.setState({ focusedChip: null });
        break;
    }
  };

  handleKeyUp = event => {
    const { newChipKeyCodes, onKeyUp } = this.props;
    if (
      !this._preventChipCreation &&
      newChipKeyCodes.indexOf(event.keyCode) > 0 &&
      this._keyPressed
    ) {
      this.clearInput();
    } else {
      this.updateInput(event.target.value);
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  handleKeyPress = event => {
    const { onKeyPress } = this.props;

    this._keyPressed = true;
    if (onKeyPress) {
      onKeyPress(event);
    }
  };

  handleUpdateInput = e => {
    const { inputValue, onUpdateInput } = this.props;

    if (inputValue == null) {
      this.updateInput(e.target.value);
    }

    if (onUpdateInput) {
      onUpdateInput(e);
    }
  };

  /**
   * Set the reference to the actual input, that is the input of the Input.
   * @param {object} ref - The reference
   */
  setActualInputRef = ref => {
    const { inputRef } = this.props;

    this.actualInput = ref;
    if (inputRef) {
      inputRef(ref);
    }
  };

  updateInput(value) {
    this.setState({ inputValue: value });
  }

  /**
   * Clears the text field for adding new chips.
   * This only works in uncontrolled input mode, i.e. if the inputValue prop is not used.
   * @public
   */
  clearInput() {
    this.updateInput('');
  }

  /**
   * Handles adding a chip.
   * @param {string|object} chip Value of the chip, either a string or an object (if dataSourceConfig is set)
   * @returns True if the chip was added (or at least `onAdd` was called), false if adding the chip was prevented
   */

  updateChips(chips, additionalUpdates = {}) {
    const { onChange } = this.props;

    this.setState({ chips, ...additionalUpdates });
    if (onChange) {
      onChange(chips);
    }
  }

  handleDeleteChip(chip, i) {
    const { value, onDelete } = this.props;
    const { chips: oldChips, focusedChip: oldFocusedChip } = this.state;
    if (!value) {
      const chips = oldChips.slice();
      const changed = chips.splice(i, 1); // remove the chip at index i
      if (changed) {
        let focusedChip = oldFocusedChip;
        if (oldFocusedChip === i) {
          focusedChip = null;
        } else if (oldFocusedChip > i) {
          focusedChip = oldFocusedChip - 1;
        }
        this.updateChips(chips, { focusedChip });
      }
    } else if (onDelete) {
      onDelete(chip, i);
    }
  }

  handleAddChip(chip) {
    const {
      onBeforeAdd,
      value,
      onAdd,
      dataSourceConfig,
      allowDuplicates,
    } = this.props;
    const { chips: oldChips } = this.state;

    if (onBeforeAdd && !onBeforeAdd(chip)) {
      this._preventChipCreation = true;
      return false;
    }
    this.clearInput();
    const chips = value || oldChips;

    if (dataSourceConfig) {
      if (typeof chip === 'string') {
        // eslint-disable-next-line
        chip = {
          [dataSourceConfig.text]: chip,
          [dataSourceConfig.value]: chip,
        };
      }

      if (
        allowDuplicates ||
        !chips.some(
          c => c[dataSourceConfig.value] === chip[dataSourceConfig.value]
        )
      ) {
        if (value && onAdd) {
          onAdd(chip);
        } else {
          this.updateChips([...oldChips, chip]);
        }
      }
      return true;
    }

    if (chip.trim().length > 0) {
      if (allowDuplicates || chips.indexOf(chip) === -1) {
        if (value && onAdd) {
          onAdd(chip);
        } else {
          this.updateChips([...oldChips, chip]);
        }
      }
      return true;
    }
    return false;
  }

  /**
   * Blurs this component.
   * @public
   */
  blur() {
    if (this.input) this.actualInput.blur();
  }

  render() {
    const {
      alwaysShowPlaceholder,
      chipRenderer = defaultChipRenderer,
      classes,
      className,
      dataSourceConfig,
      disabled,
      disableUnderline,
      error,
      FormHelperTextProps,
      fullWidth,
      fullWidthInput,
      helperText,
      id,
      InputProps = {},
      InputLabelProps = {},
      inputValue,
      label,
      placeholder,
      required,
      rootRef,
      value: propValue,
      variant,
      inputComponent = OutlinedInput,
      ...other
    } = this.props;

    const {
      chips: oldChips,
      inputValue: stateInputValue,
      isFocused,
      focusedChip,
    } = this.state;
    const chips = propValue || oldChips;
    const actualInputValue = inputValue != null ? inputValue : stateInputValue;

    const hasInput =
      (propValue || actualInputValue).length > 0 || actualInputValue.length > 0;
    const shrinkFloatingLabel =
      InputLabelProps.shrink != null
        ? InputLabelProps.shrink
        : label != null && (hasInput || isFocused || chips.length > 0);

    const chipComponents = chips.map((tag, i) => {
      const value = dataSourceConfig ? tag[dataSourceConfig.value] : tag;
      return chipRenderer(
        {
          value,
          text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
          chip: tag,
          isDisabled: !!disabled,
          isFocused: focusedChip === i,
          handleClick: () => this.setState({ focusedChip: i }),
          handleDelete: () => this.handleDeleteChip(value, i),
          className: classes.chip,
        },
        i
      );
    });

    const InputMore = {};
    InputMore.notched = shrinkFloatingLabel;
    InputMore.labelWidth =
      (shrinkFloatingLabel && this.labelNode && this.labelNode.offsetWidth) ||
      0;

    if (variant !== 'standard') {
      InputMore.startAdornment = (
        <React.Fragment>{chipComponents}</React.Fragment>
      );
    } else {
      InputProps.disableUnderline = true;
    }

    const InputComponent = inputComponent;

    return (
      <FormControl
        ref={rootRef}
        fullWidth={fullWidth}
        className={classnames(className, classes.root)}
        error={error}
        required={required}
        onClick={this.focus}
        disabled={disabled}
        variant={variant}
        {...other}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            classes={{
              root: classnames(classes[variant], classes.label),
              shrink: classes.labelShrink,
            }}
            shrink={shrinkFloatingLabel}
            focused={isFocused}
            variant={variant}
            ref={this.labelRef}
            {...InputLabelProps}
          >
            {label}
          </InputLabel>
        )}
        <div
          className={classnames(classes[variant], classes.chipContainer, {
            [classes.inkbar]: !disableUnderline && variant === 'standard',
            [classes.focused]: isFocused,
            [classes.underline]: !disableUnderline && variant === 'standard',
            [classes.disabled]: disabled,
            [classes.labeled]: label != null,
            [classes.error]: error,
          })}
        >
          {variant === 'standard' && chipComponents}
          <InputComponent
            ref={this.input}
            classes={{
              input: classnames(classes.input, classes[variant]),
              root: classnames(classes.inputRoot, classes[variant]),
            }}
            id={id}
            value={actualInputValue}
            onChange={this.handleUpdateInput}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.handleKeyPress}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            inputRef={this.setActualInputRef}
            disabled={disabled}
            fullWidth={fullWidthInput}
            placeholder={
              (!hasInput && (shrinkFloatingLabel || label == null)) ||
              alwaysShowPlaceholder
                ? placeholder
                : null
            }
            {...InputProps}
            {...InputMore}
          />
        </div>
        {helperText && (
          <FormHelperText
            {...FormHelperTextProps}
            className={
              FormHelperTextProps
                ? classnames(FormHelperTextProps.className, classes.helperText)
                : classes.helperText
            }
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
ChipInput.propTypes = {
  /** Allows duplicate chips if set to true. */
  allowDuplicates: PropTypes.bool,
  /** If true, the placeholder will always be visible. */
  alwaysShowPlaceholder: PropTypes.bool,
  /** Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip and `'ignore'` keeps the input. */
  blurBehavior: PropTypes.oneOf(['clear', 'add', 'ignore']),
  /** A function of the type `({ value, text, chip, isFocused, isDisabled, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string. */
  chipRenderer: PropTypes.func,
  /** Whether the input value should be cleared if the `value` prop is changed. */
  clearInputValueOnChange: PropTypes.bool,
  /** Data source for auto complete. This should be an array of strings or objects. */
  dataSource: PropTypes.array,
  /** Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. */
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  /** The chips to display by default (for uncontrolled mode). */
  defaultValue: PropTypes.array,
  /** Whether to use `setTimeout` to delay adding chips in case other input events like `onSelection` need to fire first */
  delayBeforeAdd: PropTypes.bool,
  /** Disables the chip input if set to true. */
  disabled: PropTypes.bool,
  /** Disable the input underline. Only valid for 'standard' variant */
  disableUnderline: PropTypes.bool,
  /** Props to pass through to the `FormHelperText` component. */
  FormHelperTextProps: PropTypes.object,
  /** If true, the chip input will fill the available width. */
  fullWidth: PropTypes.bool,
  /** If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. */
  fullWidthInput: PropTypes.bool,
  /** Helper text that is displayed below the input. */
  helperText: PropTypes.node,
  /** Props to pass through to the `InputLabel`. */
  InputLabelProps: PropTypes.object,
  /** Props to pass through to the `Input`. */
  InputProps: PropTypes.object,
  /** Use this property to pass a ref callback to the native input component. */
  inputRef: PropTypes.func,
  /** The input value (enables controlled mode for the text input if set). */
  inputValue: PropTypes.string,
  /* The content of the floating label. */
  label: PropTypes.node,
  /** The key codes used to determine when to create a new chip. */
  newChipKeyCodes: PropTypes.arrayOf(PropTypes.number),
  /** Callback function that is called when a new chip was added (in controlled mode). */
  onAdd: PropTypes.func,
  /** Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. */
  onBeforeAdd: PropTypes.func,
  /** Callback function that is called when the chips change (in uncontrolled mode). */
  onChange: PropTypes.func,
  /** Callback function that is called when a new chip was removed (in controlled mode). */
  onDelete: PropTypes.func,
  /** Callback function that is called when the input changes. */
  onUpdateInput: PropTypes.func,
  /** A placeholder that is displayed if the input has no values. */
  placeholder: PropTypes.string,
  /** The chips to display (enables controlled mode if set). */
  value: PropTypes.array,
  /** The variant of the Input component */
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled']),
};

export default withStyles(chipInputStyles)(ChipInput);

export const defaultChipRenderer = (
  { value, text, isFocused, isDisabled, handleClick, handleDelete, className },
  key
) => (
  <Chip
    key={key}
    className={className}
    style={{
      pointerEvents: isDisabled ? 'none' : undefined,
      backgroundColor: isFocused ? blue[300] : undefined,
    }}
    onClick={handleClick}
    onDelete={handleDelete}
    label={text}
  />
);

ChipInput.defaultProps = {
  allowDuplicates: false,
  blurBehavior: 'clear',
  clearInputValueOnChange: false,
  delayBeforeAdd: false,
  disableUnderline: false,
  newChipKeyCodes: [13],
  variant: 'outlined',
  defaultValue: [],
  disabled: false,
  alwaysShowPlaceholder: false,
  chipRenderer: defaultChipRenderer,
  dataSource: null,
  dataSourceConfig: null,
  FormHelperTextProps: {},
  fullWidth: false,
  fullWidthInput: false,
  helperText: 'Pressione enter',
  InputLabelProps: {},
  InputProps: PropTypes.object,
  inputRef: null,
  inputValue: null,
  label: undefined,
  onAdd: null,
  onBeforeAdd: null,
  onChange: null,
  onDelete: null,
  onUpdateInput: null,
  placeholder: null,
  value: null,
};
