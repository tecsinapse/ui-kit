import * as React from 'react';
import {
  Bubble,
  CloseIcon,
  // Fill,
  // Fit,
  IconButton,
  Message,
  // MessageGroup,
  MessageList,
  MessageMedia,
  MessageText,
  MessageTitle,
  Row,
  SendButton,
  TextComposer,
  TextInput,
  TitleBar,
  AddIcon,
  EmojiIcon,
} from '@livechat/ui-kit';

const Maximized = ({
  messages,
  onMessageSend,
  minimize,
  title,
  messagesEndRef,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <TitleBar
      rightIcons={[
        <IconButton key="close" onClick={minimize}>
          <CloseIcon />
        </IconButton>,
      ]}
      title={title}
    />
    <div
      style={{
        flexGrow: 1,
        minHeight: 0,
        height: '100%',
      }}
    >
      <MessageList active containScrollInSubtree>
        {messages.map(message => (
          <Message date={message.at} isOwn={message.own} key={message.id}>
            <Bubble isOwn={message.own}>
              {message.text && <MessageText>{message.text}</MessageText>}
              {message.title && <MessageTitle title={message.title} />}

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
                        <track default kind="captions" src={media.url} />
                      </audio>
                    )}
                    {media.mediaType.startsWith('video') && (
                      <video controls height={200}>
                        <source src={media.url} />
                        <track default kind="captions" src={media.url} />
                      </video>
                    )}
                  </MessageMedia>
                ))}
            </Bubble>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>
    </div>
    <TextComposer onSend={onMessageSend}>
      <Row align="center">
        <IconButton fit>
          <AddIcon />
        </IconButton>
        <TextInput fill />
        <SendButton fit />
      </Row>

      <Row verticalAlign="center" justify="right">
        <IconButton fit>
          <EmojiIcon />
        </IconButton>
      </Row>
    </TextComposer>

    <div
      style={{
        textAlign: 'center',
        fontSize: '.6em',
        padding: '.4em',
        background: '#fff',
        color: '#888',
      }}
    >
      {'Powered by Tecsinapse'}
    </div>
  </div>
);

export default Maximized;
