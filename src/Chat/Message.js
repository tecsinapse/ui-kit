import React, { useState } from 'react';
import {
  MessageText,
  MessageTitle,
  MessageMedia,
  Bubble,
  Message as LiveChatMessage,
} from '@livechat/ui-kit';
import { Typography, Avatar } from '@material-ui/core';
import {
  mdiFile,
  mdiDownload,
  mdiAlertCircleOutline,
  mdiImageOff,
} from '@mdi/js';
import Icon from '@mdi/react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton as IconButtonMaterial } from '../Buttons/IconButton';

import ImageLoader from './ImageLoader';

export const Message = ({
  title,
  onMessageResend,
  classes,
  message,
  addMessageName,
  addMessageDate,
  theme,
  id,
}) => {
  const [showDate, setShowDate] = useState(false);

  return (
    <div
      style={{
        display: message.own ? 'flex' : undefined,
        justifyContent: message.own ? 'flex-end' : undefined,
        marginRight:
          message.status === 'error' && message.own ? '-8px' : undefined,
      }}
    >
      <LiveChatMessage
        style={{
          marginRight:
            message.status === 'error' && message.own ? 0 : undefined,
          marginTop: addMessageName ? undefined : 0,
          marginBottom: addMessageDate ? undefined : 0,
        }}
        date={
          addMessageName && (
            <Typography variant="caption" className={classes.authorName}>
              {/* Workaround to overcome lack of authorName on message object */}
              {message.authorName}
              {(message.authorName === '' ||
                message.authorName === undefined) &&
                message.own &&
                'Você'}
              {(message.authorName === '' ||
                message.authorName === undefined) &&
                !message.own &&
                title}
            </Typography>
          )
        }
        deliveryStatus={
          <>
            {(message.status !== 'sending' && message.status !== 'error') ||
            message.own === false ? (
              <>
                {(addMessageDate || showDate) && (
                  <Typography variant="caption" className={classes.at}>
                    {message.at}
                  </Typography>
                )}
              </>
            ) : (
              <>
                {message.status === 'sending' && (
                  <Typography variant="caption" className={classes.at}>
                    Enviando...
                  </Typography>
                )}
                {message.status === 'error' && (
                  <Typography variant="caption" color="error">
                    Erro no envio
                  </Typography>
                )}
              </>
            )}
          </>
        }
        isOwn={message.own}
        key={message.id}
      >
        <Bubble
          isOwn={message.own}
          onClick={
            addMessageDate
              ? undefined
              : () => setShowDate(currentShowDate => !currentShowDate)
          }

          // TODO: Implement remove bubble when it is a image without title
          // (take care) of loading media url which needs the bubble.
          //
          // className={clsx({
          //   [classes.bubbleTransparent]:
          //   message.status !== 'sending' && message.status !== 'error' && message.medias &&
          //     message.medias.filter(
          //       media =>
          //         media.mediaType.startsWith('video') ||
          //         media.mediaType.startsWith('image')
          //     ).length > 0 &&
          //     !message.text &&
          //     !message.title,
          // })}
        >
          {message.text && (
            <MessageText>
              <Typography variant="body1">{message.text}</Typography>
            </MessageText>
          )}
          {message.title && (
            <MessageTitle
              title={<Typography variant="body1">{message.title}</Typography>}
            />
          )}

          {/* TODO: Use a media object instead of a array, given that it has only one media by message */}
          {message.medias &&
            message.medias.length > 0 &&
            message.medias.map(media => (
              <MessageMedia key={media.url}>
                {(media.mediaType.startsWith('image') ||
                  media.mediaType.startsWith('video')) && (
                  <>
                    {message.status === 'sending' ||
                    message.status === 'error' ? (
                      <div className={classes.emptyBubble}>
                        {message.status === 'sending' && (
                          <CircularProgress className={classes.progress} />
                        )}
                        {message.status === 'error' && (
                          <Icon
                            path={mdiImageOff}
                            size={1}
                            color={message.own ? 'white' : 'black'}
                            className={classes.imageError}
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        {media.mediaType.startsWith('image') && (
                          <ImageLoader
                            url={media.url}
                            classes={classes}
                            own={message.own}
                          />
                        )}

                        {media.mediaType.startsWith('video') && (
                          <video
                            controls
                            width={200}
                            className={classes.thumbnail}
                          >
                            <source src={media.url} />
                            {/* TODO: ADD A REAL TRACK OBJECT */}
                            <track default kind="captions" src={media.url} />
                          </video>
                        )}
                      </>
                    )}
                  </>
                )}

                {media.mediaType.startsWith('audio') && (
                  <audio controls className={classes.audio}>
                    <source src={media.url} />
                    {/* TODO: ADD A REAL TRACK OBJECT */}
                    <track default kind="captions" src={media.url} />
                  </audio>
                )}

                {media.mediaType.startsWith('application') && (
                  <List style={{ padding: 0 }}>
                    <ListItem
                      style={{
                        paddingTop: media.size ? 0 : undefined,
                        paddingBottom: media.size ? 0 : undefined,
                        paddingLeft: 8,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <Icon
                            path={mdiFile}
                            size={1.0}
                            color={message.own ? 'white' : 'black'}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={media.name}
                        secondary={media.size && `${media.size} Kb`}
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      />
                      <ListItemSecondaryAction
                        style={{
                          right: 0,
                        }}
                      >
                        <a href={media.url} download>
                          <IconButtonMaterial aria-label="download">
                            <Icon
                              path={mdiDownload}
                              size={1.2}
                              color={message.own ? 'white' : 'black'}
                            />
                          </IconButtonMaterial>
                        </a>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                )}
              </MessageMedia>
            ))}
        </Bubble>
      </LiveChatMessage>

      {message.status === 'error' && (
        <Tooltip title="Reenviar" placement="top">
          <IconButtonMaterial
            fill
            key="send again"
            onClick={() => {
              onMessageResend(id);
            }}
            style={{
              padding: '4px',
              height: '32px',
              alignSelf: 'center',
              top: addMessageName ? undefined : '-10px',
            }}
          >
            <Icon
              path={mdiAlertCircleOutline}
              size={1}
              color={theme.palette.error.main}
            />
          </IconButtonMaterial>
        </Tooltip>
      )}
    </div>
  );
};
