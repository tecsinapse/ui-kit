import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { cardStyle } from './styles';
import { lineBreak, normalizeInHtml } from './utils/utils';
import { MessageButtons } from './components/MessageButtons';

const useStyles = makeStyles(cardStyle);

const MessagePreview = ({ unformattedText, buttons }) => {
  const classes = useStyles();
  const [formattedText, setFormattedText] = useState();

  useEffect(() => {
    setFormattedText(normalizeInHtml(lineBreak(unformattedText)));
  }, [unformattedText]);

  return (
    <>
      <Grid className={classes.body} data-testid="test-render-message-preview">
        <Grid className={classes.card}>
          <Grid className={classes.cardText}>
            <Typography
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
            <div className={classes.textTime}>18:00</div>
          </Grid>
        </Grid>
        <Grid className={classes.cardButtons}>
          <MessageButtons buttons={buttons} classes={classes} />
        </Grid>
      </Grid>
    </>
  );
};

export { MessagePreview };
export default MessagePreview;

MessagePreview.propTypes = {
  /** plain message */
  unformattedMessage: PropTypes.string,
  /** array of buttons that should be displayed */
  buttons: PropTypes.array,
};
