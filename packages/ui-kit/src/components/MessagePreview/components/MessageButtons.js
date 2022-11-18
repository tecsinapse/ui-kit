import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { Button } from '../../Buttons';

export const MessageButtons = ({ buttons, classes }) => {
  const [previewButtons, setPreviewButtons] = useState([]);

  useEffect(() => {
    if (buttons?.length > 0 && previewButtons.length === 0) {
      buttons.forEach((it, index) => {
        if (typeof it === 'string') {
          previewButtons.push({ position: index + 1, description: it });
        } else {
          previewButtons.push(it);
        }
      });

      setPreviewButtons(previewButtons);
    }
  }, [buttons, previewButtons, setPreviewButtons]);

  const MessageButton = ({ description }) => (
    <Button type="button" className={classes.button} key={description}>
      {description}
    </Button>
  );

  const descriptionIsLong = () =>
    previewButtons?.length === 1
      ? false
      : previewButtons.filter(
          (it, index) => it.description.length > 14 && index < 2
        ).length > 0;

  return (
    <>
      {previewButtons?.length <= 2 && !descriptionIsLong() && (
        <Grid className={classes.buttons}>
          {previewButtons.map(it => (
            <MessageButton description={it.description} />
          ))}
        </Grid>
      )}
      {previewButtons?.length >= 2 &&
        descriptionIsLong() &&
        previewButtons.map(it => (
          <Grid key={it.position} className={classes.buttons}>
            <MessageButton description={it.description} />
          </Grid>
        ))}
      {previewButtons?.length > 2 && !descriptionIsLong() && (
        <>
          <Grid className={classes.buttons}>
            {previewButtons
              .filter(it => it.position < 3)
              .map(it => (
                <MessageButton description={it.description} />
              ))}
          </Grid>
          <Grid className={classes.buttons}>
            {previewButtons
              .filter(it => it.position > 2)
              .map(it => (
                <MessageButton description={it.description} />
              ))}
          </Grid>
        </>
      )}
    </>
  );
};
