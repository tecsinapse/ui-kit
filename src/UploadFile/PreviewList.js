import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

export function PreviewList({ value }) {
  return (
    <Grid container spacing={8}>
      {Object.keys(value).map(uid => (
        <Grid item xs={4} key={uid}>
          <p>{value[uid].file.name}</p>
          <LinearProgress variant="determinate" value={value[uid].completed} />
        </Grid>
      ))}
    </Grid>
  );
}
