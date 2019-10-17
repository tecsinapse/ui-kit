import React, { useState, Fragment, useRef} from 'react';
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
// import {IconButton as IconButtonMaterial} from '../Buttons/IconButton';
import { Typography } from '@material-ui/core';
import {
  mdiMicrophone,
  mdiPaperclip,
  mdiImage,
  // mdiEmoticon,  TODO: implement this buttton
  mdiLibraryVideo,
  mdiClose,
} from '@mdi/js';
import Icon from '@mdi/react';

import { defaultGreyLight2 } from '../colors';
import { MicRecorder } from './MicRecorder';

import {CustomUploader} from './CustomUploader';
import {PreviewList} from './PreviewList';

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
}) => {
  const [writing, setWriting] = useState(false);
  const [recording, setRecording] = useState(false);
  const [files, setFiles] = useState({});

  const isThereAudioSupport = onAudio !== undefined;
  const imageUpRef = useRef(null);
  const videoUpRef = useRef(null);
  const appUpRef = useRef(null);


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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <AgentBar>
        <Row flexFill>
          <Column flexFill>
            <Title>
              <Typography variant="h6">{title}</Typography>
            </Title>
            <Subtitle>
              <Typography variant="subtitle2">{subtitle}</Typography>
            </Subtitle>
          </Column>
          {hasCloseButton && (
            <Column style={{ justifyContent: 'center' }}>
              <IconButton key="close" onClick={onCloseChatClicked}>
                <Icon path={mdiClose} size={1.0} color="rgba(117, 117, 117, 0.75)" />
              </IconButton>
            </Column>
          )}
        </Row>
      </AgentBar>

      <MessageList active containScrollInSubtree>
        {messages.map(message => (
          <Message
            date={
              <Typography variant="caption">
                {/* Workaround to overcome lack of authorName on message object */}
                {message.authorName}
                {(message.authorName === '' || message.authorName === undefined) && message.own && "Você" }
                {(message.authorName === '' || message.authorName === undefined) && !message.own && title }
              </Typography>
            }
            deliveryStatus={
              <Typography
                variant="caption"
                style={{ color: '#999999', margin: '0px 8px 0px 8px' }}
              >
                {message.at}
              </Typography>
            }
            isOwn={message.own}
            key={message.id}
          >
            <Bubble isOwn={message.own}>
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
                    {media.mediaType.startsWith('image') && (
                      <img
                        src={media.url}
                        alt="Imagem"
                        style={{ maxHeight: '200px' }}
                      />
                    )}
                    {media.mediaType.startsWith('audio') && (
                      <audio controls>
                        <source src={media.url} />
                        {/* TODO: ADD A REAL TRACK OBJECT */}
                        <track
                          default
                          kind="captions"
                          src={media.url}
                        />
                      </audio>
                    )}
                    {media.mediaType.startsWith('video') && (
                      <video controls height={200}>
                        <source src={media.url} />
                        {/* TODO: ADD A REAL TRACK OBJECT */}
                        <track
                          default
                          kind="captions"
                          src={media.url}
                        />
                      </video>
                    )}
                    {media.mediaType.startsWith('application') && (
                      <p style={{ textAlign: 'center' }}>
                        <a
                          href={media.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </p>
                    )}
                  </MessageMedia>
                ))}
            </Bubble>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>

      <PreviewList files={files} setFiles={setFiles} />


      {!disabled && (
        <TextComposer
          onSend={text => {
            if(Object.keys(files).length > 0) {
              onMediaSend(text,files);
              setFiles({});
            } else {
              setWriting(false);
              onMessageSend(text);
            }
          }}
          onChange={e => setWriting(e.currentTarget.value !== '')}
        >
          {error !== '' && error !== undefined ? (
            <Row align="center" justifyContent="space-around">
              <Typography variant="subtitle2" color="error">
                {error}
              </Typography>
            </Row>
          ) : (
            <Fragment>
              <Row align="center">
                {!recording && (
                  <TextInput fill placeholder="Digite uma mensagem" />
                )}

                {writing || Object.keys(files).length > 0 ||  !isThereAudioSupport ? (
                  <SendButton fill />
                ) : (
                  !recording && (
                    <IconButton
                      fill
                      key="close"
                      onClick={() => setRecording(true)}
                    >
                      <Icon
                        path={mdiMicrophone}
                        size={1}
                        color={defaultGreyLight2}
                      />
                    </IconButton>
                  )
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
                    <Icon
                      path={mdiImage}
                      size={0.75}
                      color={defaultGreyLight2}
                    />
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
              <CustomUploader ref={imageUpRef} files={files} setFiles={setFiles} mediaType="image/*" />
              <CustomUploader ref={videoUpRef} files={files} setFiles={setFiles} mediaType="video/*" />        
              <CustomUploader ref={appUpRef} files={files} setFiles={setFiles} mediaType="application/*" />          
            
            </Fragment>
          )}
        </TextComposer>
      )}
    </div>
  );
};

export default Maximized;
