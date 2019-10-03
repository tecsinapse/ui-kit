import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Chat } from './Chat';
import { DivFlex } from '../withFlexCenter';

const ChatWrapper = () => {
  const [messages, setMessages] = useState([]);

  const sendToBackend = text => {
    // Mocking send to a local echo backend (1s)
    setTimeout(() => echoBackend(text), 1000);
  };

  const echoBackend = newMessage => {
    setMessages(prevMessage => [
      ...prevMessage,
      {
        at: Date.now(),
        own: false,
        id: Date.now(),
        text: newMessage,
      },
    ]);
  };

  return (
    <Chat
      messages={messages}
      onMessageSend={text => {
        setMessages(prevMessage => [
          ...prevMessage,
          {
            at: Date.now(),
            own: true,
            id: Date.now(),
            text,
          },
        ]);

        sendToBackend(text);
      }}
    />
  );
};

storiesOf(`Chat`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Chat', () => (
    <div style={{ width: '700px', height: '500px' }}>
      <ChatWrapper />
    </div>
  ));
