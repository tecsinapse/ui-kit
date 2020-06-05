import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Button } from '../..';
import { useAddButtonStyles } from './useAddButtonStyles';

export const AddButton = React.memo(({ push }) => {
  const {
    color,
    buttonNovoCampo,
    buttonStyle,
    marginZeroStyle,
  } = useAddButtonStyles();

  return (
    <div style={buttonStyle}>
      <Tooltip
        title="Novo Campo"
        placement="top"
        disableFocusListener
        disableTouchListener
      >
        <Button
          type="button"
          customVariant="success"
          variant="contained"
          size="large"
          onClick={push}
          aria-label="Novo Campo"
          style={buttonNovoCampo}
          disableElevation
        >
          <Icon
            path={mdiPlusCircle}
            size={1}
            color={color}
            style={marginZeroStyle}
          />
        </Button>
      </Tooltip>
    </div>
  );
});
