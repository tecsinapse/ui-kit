import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { cardStyle } from './styles';
import { MessagePreviewUtils } from './utils';
import { MessageButtons } from './components/MessageButtons';
import { PreviewHeader } from './components/PreviewHeader';

const useStyles = makeStyles(cardStyle);

export const MessagePreview = ({
  unformattedText,
  buttons,
  media,
  headerType,
  headerText,
  footer,
}) => {
  const classes = useStyles();
  const [formattedText, setFormattedText] = useState();

  useEffect(() => {
    let formatted = MessagePreviewUtils.lineBreak(unformattedText);

    formatted = MessagePreviewUtils.normalizeInHtml(formatted);
    setFormattedText(formatted);
  }, [unformattedText]);

  const currentTime = () =>
    `${new Date().toLocaleTimeString('pt-BR', { timeStyle: 'short' })}`;

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
            {headerType && (
                <PreviewHeader
                  headerType={headerType}
                  headerText={headerText}
                  media={media}
                  classes={classes}
                />
              )}
            <Typography
              className={classes.text}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
            <div className={classes.footer}>
              {footer && <div className={classes.textFooter}>{footer}</div>}
              <div className={classes.textTime}>{currentTime()}</div>
            </div>
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
  /** media link */
  media: PropTypes.string,
  /** message header text */
  headerText: PropTypes.string,
  /** message header type */
  headerType: PropTypes.string,
  /** message footer */
  footer: PropTypes.string,
};

MessagePreview.defaultProps = {
  buttons: [],
  media: undefined,
  headerType: undefined,
  headerText: undefined,
  footer: undefined,
};

export default MessagePreview;
