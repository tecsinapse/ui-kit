import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Button } from '../../Buttons';

export const MessageButtons = ({ buttons, classes }) => {
  const MessageButton = description => (
    <Button className={classes.button} key={description}>
      {description}
    </Button>
  );

  const descriptionIsLong = () =>
    buttons?.length === 1
      ? false
      : buttons.filter((it, index) => it.description.length > 14 && index < 2)
          .length > 0;

  return (
    <>
      {buttons?.length <= 2 && !descriptionIsLong() && (
        <Grid className={classes.buttons}>
          {buttons.map(it => MessageButton(it.description))}
        </Grid>
      )}
      {buttons?.length >= 2 &&
        descriptionIsLong() &&
        buttons.map(it => (
          <Grid key={it.position} className={classes.buttons}>
            {MessageButton(it.description)}
          </Grid>
        ))}
      {buttons?.length > 2 && !descriptionIsLong() && (
        <>
          <Grid className={classes.buttons}>
            {buttons
              .filter(it => it.position < 3)
              .map(it => MessageButton(it.description))}
          </Grid>
          <Grid className={classes.buttons}>
            {buttons
              .filter(it => it.position > 2)
              .map(it => MessageButton(it.description))}
          </Grid>
        </>
      )}
    </>
  );
};
