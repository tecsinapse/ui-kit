import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Button } from '../../Buttons/Button';

export const AddButton = ({ push, classes }) => {
  const theme = useTheme();
  const color = theme.palette.primary.contrastText;
  const style = { height: '100%' };
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const buttonStyle = { maxHeight: !matches ? '56px' : '40px' };

  return (
    <div style={buttonStyle}>
      <Tooltip title="Novo Campo" placement="top" arrow>
        <Button
          type="button"
          customVariant="success"
          variant="contained"
          size="large"
          className={classes.marginLeft}
          onClick={push}
          aria-label="Novo Campo"
          style={style}
          disableElevation
        >
          <Icon path={mdiPlusCircle} size={1} color={color} />
        </Button>
      </Tooltip>
    </div>
  );
};
