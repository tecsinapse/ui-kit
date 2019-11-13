import React, { useState, useRef } from 'react';
import {
  TextInput,
  MessageList,
  Message,
  MessageText,
  AgentBar,
  Title,
  Subtitle,
  MessageTitle,
  MessageMedia,
  TextComposer,
  Row,
  IconButton,
  SendButton,
  Column,
  Bubble,
} from '@livechat/ui-kit';
import { Typography, Avatar } from '@material-ui/core';
import {
  mdiMicrophone,
  mdiPaperclip,
  mdiImage,
  mdiLibraryVideo,
  mdiClose,
  mdiFile,
  mdiDownload,
  mdiSend,
  mdiAlertCircle,
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
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconButton as IconButtonMaterial } from '../Buttons/IconButton';

import { defaultGreyLight2, defaultGreyLight5, defaultGrey2 } from '../colors';
import { MicRecorder } from './MicRecorder';

import { CustomUploader } from './CustomUploader';
import { PreviewList } from './PreviewList';
import { Loading } from './Loading';
import ImageLoader from './ImageLoader';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  at: {
    color: defaultGreyLight5,
  },
  authorName: {
    color: defaultGrey2,
  },
  bubbleTransparent: {
    border: 'unset',
    borderRadius: 'unset',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: 'unset',
  },
  audio: {
    display: 'flex',
    padding: '5px',
  },
  progress: {
    width: '20px !important',
    height: '20px !important',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
    position: 'absolute',
    color: 'black',
  },
  imageError: {
    opacity: '0.4',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  emptyBubble: {
    width: '75px',
    height: '50px',
    position: 'relative',
  },
  thumbnail: {
    maxWidth: '200px',
    maxHeight: '200px',
    border: '1px solid black',
  },
  errorDiv: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
    zIndex: 2,
    padding: '4px',
    boxShadow: '0 1px 1px grey',
    border: `1px solid ${theme.palette.error.main}`,
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '6px',
    alignItems: 'center',
    borderRadius: '6px 6px 6px 6px',
  },
  errorDivIcon: {
    padding: '6px',
    display: 'flex',
  },
  errorDivText: {
    flexGrow: '2',
    display: 'flex',
    alignItems: 'center',
  },
}));

const ENTER_KEYCODE = 13;
const wasEnterPressed = function wasEnterPressed(event) {
  return event.which === ENTER_KEYCODE;
};
const wasOnlyEnterPressed = function wasOnlyEnterPressed(event) {
  return wasEnterPressed(event) && !event.altKey && !event.shiftKey;
};

const Maximized = ({
  messages,
  onMessageSend,
  minimize,
  messagesEndRef,
  disabled,
  onAudio,
  hasCloseButton = true,
  title,
  subtitle,
  onCloseChat,
  error,
  onMediaSend,
  isLoading,
  loadMore,
  maxFileUploadSize,
  onMessageResend,
}) => {
  const classes = useStyle();
  const theme = useTheme();
  const [writing, setWriting] = useState(false);
  const [recording, setRecording] = useState(false);
  const [files, setFiles] = useState({});
  const [showError, setShowError] = useState(true);

  const isThereAudioSupport = onAudio !== undefined;
  const imageUpRef = useRef(null);
  const videoUpRef = useRef(null);
  const appUpRef = useRef(null);
  const [inputRef, setInputRef] = useState(null);

  const onStopRecording = (blob, accept) => {
    setRecording(false);
    if (accept) {
      onAudio(blob);
    }
  };

  const onCloseChatClicked = e => {
    if (onCloseChat) {
      onCloseChat(e);
    }
    minimize(e);
  };

  return (
    <div className={classes.root}>
      <AgentBar>
        <Row flexFill>
          <Column flexFill>
            <Title>
              <Typography
                variant="h6"
                style={{ color: theme.palette.primary.contrastText }}
              >
                {title}
              </Typography>
            </Title>
            <Subtitle>
              <Typography
                variant="subtitle2"
                style={{ color: theme.palette.primary.contrastText }}
              >
                {subtitle}
              </Typography>
            </Subtitle>
          </Column>
          {hasCloseButton && (
            <Column style={{ justifyContent: 'center' }}>
              <IconButtonMaterial key="close" onClick={onCloseChatClicked}>
                <Icon
                  path={mdiClose}
                  size={1.0}
                  color={theme.palette.primary.contrastText}
                />
              </IconButtonMaterial>
            </Column>
          )}
        </Row>
      </AgentBar>

      {isLoading && <Loading />}
      <MessageList active onScrollTop={loadMore}>
        {error !== '' && error !== undefined && showError && (
          <div className={classes.errorDiv}>
            <div className={classes.errorDivIcon}>
              <Icon path={mdiAlertCircle} size={0.75} color="white" />
            </div>
            <div className={classes.errorDivText}>
              <Typography variant="body2">{error}</Typography>
            </div>
            <IconButtonMaterial key="close" onClick={() => setShowError(false)}>
              <Icon
                path={mdiClose}
                size={0.75}
                color={theme.palette.primary.contrastText}
              />
            </IconButtonMaterial>
          </div>
        )}

        {messages.map((message, id) => (
          <div
            style={{
              display: message.own ? 'flex' : undefined,
              justifyContent: message.own ? 'flex-end' : undefined,
              marginRight:
                message.status === 'error' && message.own ? '-8px' : undefined,
            }}
          >
            <Message
              style={{
                marginRight:
                  message.status === 'error' && message.own ? '0' : undefined,
              }}
              date={
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
              }
              deliveryStatus={
                <>
                  {(message.status !== 'sending' &&
                    message.status !== 'error') ||
                  message.own === false ? (
                    <Typography variant="caption" className={classes.at}>
                      {message.at}
                    </Typography>
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
                    title={
                      <Typography variant="body1">{message.title}</Typography>
                    }
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
                                <CircularProgress
                                  className={classes.progress}
                                />
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
                                  <track
                                    default
                                    kind="captions"
                                    src={media.url}
                                  />
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
            </Message>
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
        ))}
        <div ref={messagesEndRef} />
      </MessageList>

      <PreviewList files={files} setFiles={setFiles} />

      {!disabled && (
        <TextComposer
          onSend={text => {
            if (Object.keys(files).length > 0) {
              onMediaSend(text, files);
            } else {
              onMessageSend(text);
            }
            setFiles({});
            setWriting(false);
          }}
          onKeyDown={e => {
            if (
              !writing &&
              wasOnlyEnterPressed(e) &&
              Object.keys(files).length > 0
            ) {
              onMediaSend('', files);
              setFiles({});
            }
          }}
          onChange={e => setWriting(e.currentTarget.value !== '')}
          inputRef={ref => setInputRef(ref)}
        >
          <>
            <Row align="center">
              {!recording && (
                <TextInput fill placeholder="Digite uma mensagem" />
              )}

              {/* 
                  It's using the <SendButton/ /> to handle the send when typing 
                  some text (easier because it is implemented by the livechat).
                  This scenario cannot handle the attachment files with no text (active bug), though.
                  So, we are using the <Icon /> to handle the bug scenario and keeping the 
                  livechat for user text scenario (with or without attachment).
                  TODO: Keep only one handler, either by fixing the active bug or implementing the text 
                  handler on our <Icon /> (using controlled component passing 'value ' to TextComposer)
                */}
              {(writing || !isThereAudioSupport) && <SendButton fill />}
              {!writing && !recording && Object.keys(files).length > 0 && (
                <IconButton
                  fill
                  key="send"
                  onClick={() => {
                    onMediaSend('', files);
                    setFiles({});
                  }}
                  style={{ maxHeight: 37, maxWidth: 35 }}
                >
                  <Icon
                    path={mdiSend}
                    size={1.143}
                    color="#427fe1"
                    style={{ maxHeight: 26, maxWidth: 24 }}
                  />
                </IconButton>
              )}

              {!writing &&
                isThereAudioSupport &&
                Object.keys(files).length <= 0 &&
                !recording && (
                  <IconButton fill key="mic" onClick={() => setRecording(true)}>
                    <Icon
                      path={mdiMicrophone}
                      size={1}
                      color={defaultGreyLight2}
                    />
                  </IconButton>
                )}

              {recording && <MicRecorder onStopRecording={onStopRecording} />}
            </Row>

            {!recording && (
              <Row verticalAlign="center" justify="left">
                <IconButton
                  fill
                  key="image"
                  onClick={() => imageUpRef.current.open()}
                >
                  <Icon path={mdiImage} size={0.75} color={defaultGreyLight2} />
                </IconButton>

                <IconButton
                  fill
                  key="movie"
                  onClick={() => videoUpRef.current.open()}
                >
                  <Icon
                    path={mdiLibraryVideo}
                    size={0.75}
                    color={defaultGreyLight2}
                  />
                </IconButton>

                <IconButton
                  fill
                  key="paperclip"
                  onClick={() => appUpRef.current.open()}
                >
                  <Icon
                    path={mdiPaperclip}
                    size={0.75}
                    color={defaultGreyLight2}
                  />
                </IconButton>
              </Row>
            )}
            <CustomUploader
              focusRef={inputRef}
              ref={imageUpRef}
              files={files}
              setFiles={setFiles}
              mediaType="image/*"
              maxFileUploadSize={maxFileUploadSize}
            />
            <CustomUploader
              focusRef={inputRef}
              ref={videoUpRef}
              files={files}
              setFiles={setFiles}
              mediaType="video/*"
              maxFileUploadSize={maxFileUploadSize}
            />
            <CustomUploader
              focusRef={inputRef}
              ref={appUpRef}
              files={files}
              setFiles={setFiles}
              maxFileUploadSize={maxFileUploadSize}
            />
          </>
        </TextComposer>
      )}
    </div>
  );
};

export default Maximized;
