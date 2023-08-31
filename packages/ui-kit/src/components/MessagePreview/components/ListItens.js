import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { mdiFormatListBulletedSquare } from '@mdi/js';
import Icon from '@mdi/react';

export const ListItens = ({ sections, classes }) => (
  <Grid container>
    <div className={classes.button}>
      <Icon path={mdiFormatListBulletedSquare} size={1} />
      <Typography>Ver Opções</Typography>
    </div>
  </Grid>
);
