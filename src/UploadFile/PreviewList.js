import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

function PreviewList({ value }) {
  return (
    <Grid container spacing={8}>
      {value.map(fileObject => (
        <Grid item xs={4} key={fileObject._id}>
          <p>{fileObject.file.name}</p>
          <LinearProgress variant="determinate" value={fileObject.completed} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PreviewList;
