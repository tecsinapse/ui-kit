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

  const sendAudioToBackend = blob => {
      // Mocking send to a local echo backend (1s)
      setTimeout(() => echoAudioBackend(blob), 3000);
  
  }

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

  const echoAudioBackend = blob => {
    setMessages(prevMessage => [
      ...prevMessage,
      {
        at: Date.now(),
        own: false,
        id: Date.now(),
        media: {
            mediaType: 'audio',
            url: blob.blobURL,
        },
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

      onAudio={blob => {
        console.log(blob);
        if (blob !== null) {
          setMessages(prevMessage => [
            ...prevMessage,
            {
              at: Date.now(),
              own: true,
              id: Date.now(),
              media: {
                  mediaType: 'audio',
                  url: blob.blobURL,
              },
            },
          ]);

          sendAudioToBackend(blob);
        }

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
