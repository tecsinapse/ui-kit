import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { mdiTurtle } from '@mdi/js';
import Icon from '@mdi/react';

import { DefaultProductTypography } from '../DefaultProductTypography';

const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  noPadding: {
    padding: 0,
  },
});

export const ListHeader = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem alignItems="flex-start" divider className={classes.flexColumn}>
        <DefaultProductTypography title="Portal" subtitle="BAMAQ" />
        <ListItemText
          className={classes.noPadding}
          secondary="Gestão de frotas"
        />
        <ListItemSecondaryAction>
          <Icon path={mdiTurtle} size={1} />
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};
