import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Icon from '@mdi/react';
import { Button, Divider } from '..';

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
      <MenuItem
        style={{
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'space-between',
        }}
        component="div"
        onClick={buttonLabel ? () => {} : selectAll}
      >
        <div>
          <Checkbox
            checked={allSelected}
            value="checkedA"
            onChange={selectAll}
          />
          {selectPromptMessage}
        </div>
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
      </MenuItem>
      <Divider variant="solid" />
    </>
  );
};
