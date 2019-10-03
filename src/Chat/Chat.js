import React from 'react';
import { FixedWrapper, ThemeProvider } from '@livechat/ui-kit';
import PropTypes from 'prop-types';

import Maximized from './Maximized';
import Minimized from './Minimized';

export const Chat = ({ messages, onMessageSend, title, messagesEndRef }) => (
  <div>
    <ThemeProvider>
      <div>
        <FixedWrapper.Root>
          <FixedWrapper.Maximized>
            <Maximized
              messages={messages}
              onMessageSend={onMessageSend}
              title={title}
              messagesEndRef={messagesEndRef}
            />
          </FixedWrapper.Maximized>
          <FixedWrapper.Minimized>
            <Minimized />
          </FixedWrapper.Minimized>
        </FixedWrapper.Root>
      </div>
    </ThemeProvider>
  </div>
);

Chat.defaultProps = {
  title: '',
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      at: PropTypes.string,
      own: PropTypes.bool,
      id: PropTypes.string,
      text: PropTypes.string,
      medias: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          mediaType: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onMessageSend: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Chat;
