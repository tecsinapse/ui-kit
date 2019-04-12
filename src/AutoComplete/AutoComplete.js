import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { Chip } from '@material-ui/core';
import { Input } from '../Inputs/Input';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    maxHeight: '200px',
    overflow: 'scroll',
  },
  chipContainer: {
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
}));

let openSuggestionsTimeout;

const handleInputChange = (
  setInputValue,
  options,
  setAnchorEl,
  setLoading,
  setSuggestions,
  setSuggestionsRef,
  setError
) => ({ target, currentTarget }) => {
  setInputValue(target.value);
  if (target.value) {
    if (openSuggestionsTimeout) {
      clearTimeout(openSuggestionsTimeout);
    }
    openSuggestionsTimeout = setTimeout(() => {
      setLoading(true);
      options(target.value)
        .then(suggestions => {
          setLoading(false);
          setSuggestions(suggestions);
          setAnchorEl(currentTarget);
          setError(null);
        })
        .catch(({ message }) => {
          setLoading(false);
          setError(message);
        });
    }, 500);
  } else {
    handleCloseSuggestions(setAnchorEl, setSuggestionsRef)();
  }
};

const handleSuggestionsKeyDown = (
  setAnchorEl,
  setSuggestionsRef,
  inputRef
) => event => {
  if (event.key === 'Escape') {
    handleCloseSuggestions(setAnchorEl, setSuggestionsRef)();
    setTimeout(() => inputRef.focus(), 0);
  }
};

const handleInputKeyDown = suggestionsRef => event => {
  if (event.key === 'ArrowDown' && suggestionsRef) {
    suggestionsRef.focus();
  }
};

const handleDeleteChip = (value, onDeleteItem, inputRef) => () => {
  if (!onDeleteItem) return;
  onDeleteItem(value);
  inputRef.focus();
};

const handleOnClickItem = (
  onSelectItem,
  suggestion,
  setAnchorEl,
  inputRef,
  setSuggestionsRef,
  inputValue
) => () => {
  if (!onSelectItem) return;
  onSelectItem(suggestion);
  handleCloseSuggestions(setAnchorEl, setSuggestionsRef)();
  inputValue('');
  inputRef.focus();
};

const handleCloseSuggestions = (setAnchorEl, setSuggestionsRef) => () => {
  setAnchorEl(null);
  setSuggestionsRef(null);
};

const AutoComplete = ({
  inputProps,
  paperProps,
  itemProps,
  values,
  onDeleteItem,
  onSelectItem,
  options,
}) => {
  const classes = styles();
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [inputRef, setInputRef] = useState(null);
  const [suggestionsRef, setSuggestionsRef] = useState(null);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      ref={setContainerRef}
    >
      <Input
        name="inputValue"
        value={inputValue}
        onKeyDown={handleInputKeyDown(suggestionsRef)}
        onChange={handleInputChange(
          setInputValue,
          options,
          setAnchorEl,
          setLoading,
          setSuggestions,
          setSuggestionsRef,
          setError
        )}
        {...inputProps}
        inputRef={setInputRef}
        error={error}
        endAdornment={
          loading ? <CircularProgress size={25} thickness={2} /> : null
        }
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        style={{ width: containerRef ? containerRef.offsetWidth - 7 : null }}
      >
        <Paper className={classes.paper} {...paperProps}>
          <ClickAwayListener
            onClickAway={handleCloseSuggestions(setAnchorEl, setSuggestionsRef)}
          >
            <MenuList
              ref={setSuggestionsRef}
              onKeyDown={handleSuggestionsKeyDown(
                setAnchorEl,
                setSuggestionsRef,
                inputRef
              )}
            >
              {suggestions &&
                suggestions.map(suggestion => (
                  <MenuItem
                    key={suggestion.id}
                    onClick={handleOnClickItem(
                      onSelectItem,
                      suggestion,
                      setAnchorEl,
                      inputRef,
                      setSuggestionsRef,
                      setInputValue
                    )}
                    {...itemProps}
                  >
                    {suggestion.label}
                  </MenuItem>
                ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      <div className={classes.chipContainer}>
        {values &&
          values.length > 0 &&
          values.map(value => (
            <Chip
              key={value.id}
              label={value.label}
              color="primary"
              clickable
              className={classes.chip}
              onDelete={handleDeleteChip(value, onDeleteItem, inputRef)}
            />
          ))}
      </div>
    </div>
  );
};

AutoComplete.defaultProps = {
  inputProps: null,
  paperProps: null,
  itemProps: null,
  values: null,
  onDeleteItem: null,
  onSelectItem: null,
};

AutoComplete.propTypes = {
  inputProps: PropTypes.object,
  paperProps: PropTypes.object,
  itemProps: PropTypes.object,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  options: PropTypes.func.isRequired,
};

export default AutoComplete;
