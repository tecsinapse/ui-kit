import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react';
import { Button } from 'components/Buttons';
import { Divider } from 'components/Divider';

const style = {
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'space-between',
};

export const SelectAllButton = ({
  selectAll,
  allSelected,
  selectPromptMessage,
  customAction = {},
}) => {
  const {
    buttonLabel,
    handleClick,
    buttonIcon,
    buttonVariant,
    buttonColor,
  } = customAction;

  return (
    <>
      <MenuItem style={style} component="div" onClick={selectAll}>
        <div>
          <Checkbox
            checked={allSelected}
            value="checkedA"
            onChange={selectAll}
          />
          {selectPromptMessage}
        </div>
        <div id="customAction">
          {buttonLabel && (
            <Button
              onClick={handleClick}
              variant={buttonVariant || 'contained'}
              color={buttonColor || 'primary'}
            >
              {buttonIcon && <Icon path={buttonIcon} size={1} color="white" />}
              {buttonLabel}
            </Button>
          )}
        </div>
      </MenuItem>
      <Divider variant="solid" />
    </>
  );
};
