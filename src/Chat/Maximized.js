import React, { useState, Fragment } from 'react';
import {
  Avatar,
  TitleBar,
  TextInput,
  MessageList,
  Message,
  MessageText,
  AgentBar,
  Title,
  Subtitle,
  MessageGroup,
  MessageButtons,
  MessageButton,
  MessageTitle,
  MessageMedia,
  TextComposer,
  Row,
  Fill,
  Fit,
  IconButton,
  SendButton,
  EmojiIcon,
  CloseIcon,
  Column,
  RateGoodIcon,
  RateBadIcon,
  Bubble,
  AddIcon,
} from '@livechat/ui-kit';
//import {IconButton as IconButtonMaterial} from '../Buttons/IconButton';
import { Typography } from '@material-ui/core';
import {
  mdiMicrophone,
  mdiPaperclip,
  mdiImage,
  mdiEmoticon,
  mdiLibraryVideo,
  mdiClose,
} from '@mdi/js';
import Icon from '@mdi/react';

import { defaultGreyLight2, defaultGreyLight3 } from '../colors';
import { MicRecorder } from './MicRecorder';

const Maximized = ({
  messages,
  onMessageSend,
  minimize,
  title,
  messagesEndRef,
  onAudio,
}) => {
  const [writing, setWriting] = useState(false);
  const [recording, setRecording] = useState(false);

  const isThereAudioSupport = onAudio !== undefined;

  const onStopRecording = (blob, accept) => {
    setRecording(false);
    if (accept) {
      onAudio(blob);
    }
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
              <Typography variant="h6">Frankin Delaine</Typography>
            </Title>
            <Subtitle>
              <Typography variant="subtitle2">
                Ultima mensagem: 01/02/2019 10:12
              </Typography>
            </Subtitle>
          </Column>
          <Column style={{ justifyContent: 'center' }}>
            <IconButton key="close" onClick={minimize}>
              <Icon path={mdiClose} size={1} color={defaultGreyLight2} />
            </IconButton>
          </Column>
        </Row>
      </AgentBar>

      <MessageList active containScrollInSubtree>
        {messages.map(message => (
          <Message
            date={<Typography variant="caption">Frankin Delaine</Typography>}
            deliveryStatus={
              <Typography
                variant="caption"
                style={{ color: '#999999', margin: '0px 8px 0px 8px' }}
              >
                01/02/2019 10:12
              </Typography>
            }
            isOwn={message.own}
            key={message.id}
          >
            {!message.media ? (
              <Bubble isOwn={message.own}>
                {message.text && (
                  <MessageText>
                    <Typography variant="body1">{message.text}</Typography>
                  </MessageText>
                )}
              </Bubble>
            ) : (
              <Fragment>
                {message.title && <MessageTitle title={message.title} />}
                <MessageMedia key={message.media.url}>
                  {message.media.mediaType.startsWith('image') && (
                    <img
                      src={message.media.url}
                      alt="Imagem"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  {message.media.mediaType.startsWith('audio') && (
                    <audio controls>
                      <source src={message.media.url} />
                      <track default kind="captions" src={message.media.url} />
                    </audio>
                  )}
                  {message.media.mediaType.startsWith('video') && (
                    <video controls height={200}>
                      <source src={message.media.url} />
                      <track default kind="captions" src={message.media.url} />
                    </video>
                  )}
                  {message.media.mediaType.startsWith('application') && (
                    <p style={{ textAlign: 'center' }}>
                      <a
                        href={message.media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </p>
                  )}
                </MessageMedia>
              </Fragment>
            )}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>
      <TextComposer
        onSend={text => {
          setWriting(false);
          onMessageSend(text);
        }}
        onChange={e => setWriting(e.currentTarget.value !== '')}
      >
        <Row align="center">
          {!recording && <TextInput fill placeholder="Digite uma mensagem" />}

          {writing || !isThereAudioSupport ? (
            <SendButton fill />
          ) : (
            !recording && (
              <IconButton fill key="close" onClick={() => setRecording(true)}>
                <Icon path={mdiMicrophone} size={1} color={defaultGreyLight2} />
              </IconButton>
            )
          )}

          {recording && <MicRecorder onStopRecording={onStopRecording} />}
        </Row>

        {!recording && (
          <Row verticalAlign="center" justify="left">
            <IconButton fill key="image" onClick={() => console.log('image')}>
              <Icon path={mdiImage} size={0.75} color={defaultGreyLight2} />
            </IconButton>

            <IconButton fill key="movie" onClick={() => console.log('image')}>
              <Icon
                path={mdiLibraryVideo}
                size={0.75}
                color={defaultGreyLight2}
              />
            </IconButton>

            <IconButton
              fill
              key="paperclip"
              onClick={() => console.log('docs')}
            >
              <Icon path={mdiPaperclip} size={0.75} color={defaultGreyLight2} />
            </IconButton>

            <IconButton
              fill
              key="emoticon"
              onClick={() => console.log('image')}
            >
              <Icon path={mdiEmoticon} size={0.75} color={defaultGreyLight2} />
            </IconButton>
          </Row>
        )}
      </TextComposer>
    </div>
  );
};

export default Maximized;
