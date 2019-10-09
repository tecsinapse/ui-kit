import React from 'react';
import { FixedWrapper } from '@livechat/ui-kit';
import PropTypes from 'prop-types';

import Maximized from './Maximized';
import Minimized from './Minimized';
import ChatTheme from './ChatTheme';

export const Chat = ({
  messages,
  onMessageSend,
  title,
  messagesEndRef,
  onAudio,
}) => (
  <div>
    <ChatTheme>
      <div>
        <FixedWrapper.Root>
          <FixedWrapper.Maximized>
            <Maximized
              messages={messages}
              onMessageSend={onMessageSend}
              title={title}
              messagesEndRef={messagesEndRef}
              onAudio={onAudio}
            />
          </FixedWrapper.Maximized>
          <FixedWrapper.Minimized>
            <Minimized />
          </FixedWrapper.Minimized>
        </FixedWrapper.Root>
      </div>
    </ChatTheme>
  </div>
);

Chat.defaultProps = {
  title: '',
  onAudio: undefined,
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      at: PropTypes.string,
      own: PropTypes.bool,
      id: PropTypes.string,
      text: PropTypes.string,
      title: PropTypes.string,
      media: PropTypes.shape({
          url: PropTypes.string,
          mediaType: PropTypes.oneOf(['image', 'video', 'audio', 'application']),
      }),
    })
  ).isRequired,
  onMessageSend: PropTypes.func.isRequired,
  onAudio: PropTypes.func,
  title: PropTypes.string,
};

export default Chat;
