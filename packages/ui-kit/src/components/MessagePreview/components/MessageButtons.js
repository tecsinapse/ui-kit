import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';

export const MessageButtons = ({ buttons, classes }) => {
  const [previewButtons, setPreviewButtons] = useState([]);

  useEffect(() => {
    const newPreviewButtons = [];

    buttons.forEach((it, index) => {
      if (typeof it === 'string') {
        newPreviewButtons.push({ position: index + 1, description: it });
      } else {
        newPreviewButtons.push(it);
      }
    });

    setPreviewButtons(newPreviewButtons);
  }, [buttons]);

  const MessageButton = ({ description }) => (
    <div className={classes.button} key={description}>
      {description}
    </div>
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
