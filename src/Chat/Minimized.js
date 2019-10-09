import React from 'react';
import { ChatIcon, IconButton } from '@livechat/ui-kit';
import Icon from '@mdi/react';
import { mdiForum} from '@mdi/js';
import {Badge} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {FloatingButton} from '../Buttons/FloatingButton';
//import {defaultOrange} from '../colors';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

const Minimized = ({ maximize }) => {
  //const classes = useStyles();

  return (
  <Badge color="error" badgeContent={4}>
    <FloatingButton
      onClick={maximize}
      variant="primary"
      size="large"
    >
      <Icon path={mdiForum} size={1.25} />
    </FloatingButton>
  </Badge>
  );
}
export default Minimized;
