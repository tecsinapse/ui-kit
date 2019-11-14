import React from 'react';
import { FixedWrapper } from '@livechat/ui-kit';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/styles';

import Maximized from './Maximized';
import Minimized from './Minimized';
import ChatTheme from './ChatTheme';

export const Chat = ({
  messages,
  onMessageSend,
  messagesEndRef,
  disabled,
  isMaximizedOnly,
  onAudio,
  title,
  subtitle,
  onCloseChat,
  error,
  onMediaSend,
  notifyNumber,
  isLoading,
  loadMore,
  maxFileUploadSize,
  isBlocked,
  blockedMessage,
}) => {
  const theme = useTheme();

  return (
    <div>
      <ChatTheme materialTheme={theme}>
        <div>
          <FixedWrapper.Root maximizedOnInit={isMaximizedOnly}>
            <FixedWrapper.Maximized>
              <Maximized
                messages={messages}
                onMessageSend={onMessageSend}
                messagesEndRef={messagesEndRef}
                onAudio={onAudio}
                disabled={disabled}
                isMaximizedOnly={isMaximizedOnly}
                hasCloseButton={!isMaximizedOnly}
                title={title}
                subtitle={subtitle}
                onCloseChat={onCloseChat}
                error={error}
                onMediaSend={onMediaSend}
                isLoading={isLoading}
                loadMore={loadMore}
                maxFileUploadSize={maxFileUploadSize}
                isBlocked={isBlocked}
                blockedMessage={blockedMessage}
              />
            </FixedWrapper.Maximized>

            <FixedWrapper.Minimized>
              {!isMaximizedOnly && <Minimized notifyNumber={notifyNumber} />}
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </div>
      </ChatTheme>
    </div>
  );
};

Chat.defaultProps = {
  onAudio: undefined,
  disabled: false,
  isMaximizedOnly: false,
  title: '',
  subtitle: '',
  onCloseChat: undefined,
  error: undefined,
  onMediaSend: undefined,
  notifyNumber: 0,
  isLoading: false,
  loadMore: undefined,
  maxFileUploadSize: 20971520, // 20 MB
  isBlocked: undefined,
  blockedMessage: 'The chat is blocked',
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      at: PropTypes.string,
      own: PropTypes.bool,
      id: PropTypes.string,
      text: PropTypes.string,
      title: PropTypes.string,
      authorName: PropTypes.string,
      medias: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          mediaType: PropTypes.oneOf([
            'image',
            'video',
            'audio',
            'application',
          ]),
          name: PropTypes.string,
          size: PropTypes.number,
        })
      ),
    })
  ).isRequired,
  onMessageSend: PropTypes.func.isRequired,

  // onAudio is not required, when it is not informed the chat doesn't support audio though!
  onAudio: PropTypes.func,

  // Event handler closing the chat
  onCloseChat: PropTypes.func,

  // onMwedia is not required, when it is not informed the chat doesn't support media
  onMediaSend: PropTypes.func,

  disabled: PropTypes.bool,
  isMaximizedOnly: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  error: PropTypes.string,
  notifyNumber: PropTypes.number,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func,
  maxFileUploadSize: PropTypes.number,
  isBlocked: PropTypes.bool,
  blockedMessage: PropTypes.string,
};

export default Chat;
