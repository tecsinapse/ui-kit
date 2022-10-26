import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { cardStyle } from './styles';
import { lineBreak, normalizeInHtml } from './utils/utils';
import { MessageButtons } from './components/MessageButtons';

const useStyles = makeStyles(cardStyle);

export const MessagePreview = ({ unformattedText, buttons }) => {
  const classes = useStyles();
  const [formattedText, setFormattedText] = useState();

  useEffect(() => {
    setFormattedText(normalizeInHtml(lineBreak(unformattedText)));
  }, [unformattedText]);

  return (
    <Grid
      className={classes.body}
      container
      justify="flex-start"
      alignContent="center"
    >
      <Grid
        className={classes.message}
        data-testid="test-render-message-preview"
      >
        <Grid className={classes.card}>
          <Grid className={classes.cardText}>
            <Typography
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
            <div className={classes.textTime}>18:00</div>
          </Grid>
        </Grid>
        {buttons?.length > 0 && (
          <Grid className={classes.cardButtons}>
            <MessageButtons buttons={buttons} classes={classes} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

MessagePreview.propTypes = {
  /** plain message */
  unformattedText: PropTypes.string.isRequired,
  /** array of buttons that should be displayed */
  buttons: PropTypes.array,
};

MessagePreview.defaultProps = {
  unformattedText: 'O _*Modelo de Mensagem*_ aparece aqui, após selecionado',
  buttons: [],
};

export default MessagePreview;
