import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Chat } from './Chat';
import { DivFlex } from '../withFlexCenter';

const ChatWrapper = ({
  initialMessages = [],
  isMaximizedOnly = false,
  error,
  isBlocked = false,
  blockedMessage = undefined,
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const mockStatusMessage = (id, status) => {
    setMessages(prevMessages => {
      const copyMessages = [...prevMessages];
      copyMessages[id].status = status;
      return copyMessages;
    });
  };

  const sendToBackend = (text, id) => {
    // Mocking change state to delivered
    setTimeout(() => mockStatusMessage(id, 'delivered'), 1000);

    // Mocking send to a local echo backend
    if ((id + 1) % 2 === 0) {
      setTimeout(() => echoBackend(text), 2000);
      setTimeout(() => echoBackend(text), 3000);
    }
  };

  const echoBackend = newMessage => {
    setMessages(prevMessage => [
      ...prevMessage,
      {
        at: '02/03/2019 10:12',
        own: false,
        id: Date.now().toString(),
        text: newMessage,
      },
    ]);
  };

  const sendAudioToBackend = (blob, id) => {
    // Mocking change state to delivered
    setTimeout(() => mockStatusMessage(id, 'delivered'), 2000);

    // Mocking send to a local echo backend
    setTimeout(() => echoAudioBackend(blob), 4000);
  };

  const echoAudioBackend = blob => {
    setMessages(prevMessage => [
      ...prevMessage,
      {
        at: '02/03/2019 10:12',
        own: false,
        id: Date.now().toString(),
        medias: [
          {
            mediaType: 'audio',
            url: blob.blobURL,
          },
        ],
      },
    ]);
  };

  const sendMediaToBackend = (file, title, id) => {
    // Mocking change state to delivered
    setTimeout(() => mockStatusMessage(id, 'delivered'), 2000);

    // Mocking send to a local echo backend
    setTimeout(() => echoMediaBackend(file, title), 5000);
  };

  const echoMediaBackend = (file, title) => {
    setMessages(prevMessage => [
      ...prevMessage,
      {
        at: '02/03/2019 10:12',
        own: false,
        id: Date.now().toString(),
        medias: [
          {
            mediaType: file.mediaType,
            url: file.data,
            name: file.name,
            // size: file.size, emulate scenario without size from backend
          },
        ],
        title,
      },
    ]);
  };

  return (
    <Chat
      error={error}
      isMaximizedOnly={isMaximizedOnly}
      isBlocked={isBlocked}
      blockedMessage={blockedMessage}
      messages={messages}
      title="Felipe Rodrigues"
      subtitle="Última mensagem 10/10/2019 10:10"
      onMessageSend={text => {
        setMessages(prevMessages => {
          const copyPrevMessages = [...prevMessages];
          const id =
            copyPrevMessages.push({
              at: '02/03/2019 10:12',
              own: true,
              id: Date.now().toString(),
              authorName: 'Você',
              status: 'sending',
              text,
            }) - 1;
          if (!error) {
            sendToBackend(text, id);
          }
          return copyPrevMessages;
        });
      }}
      onAudio={blob => {
        if (blob !== null) {
          let id;
          setMessages(prevMessages => {
            const copyPrevMessages = [...prevMessages];
            id =
              copyPrevMessages.push({
                at: '02/03/2019 10:12',
                own: true,
                id: Date.now().toString(),
                authorName: 'Você',
                status: 'sending',
                medias: [
                  {
                    mediaType: 'audio',
                    url: blob.blobURL,
                  },
                ],
              }) - 1;
            return copyPrevMessages;
          });

          if (!error) {
            sendAudioToBackend(blob, id);
          }
        }
      }}
      // onCloseChat={(e) => console.log(e)}

      onMediaSend={(title, files) => {
        if (files !== null) {
          Object.keys(files).forEach((uid, i) => {
            let id;
            setMessages(prevMessages => {
              const copyPrevMessages = [...prevMessages];

              id =
                copyPrevMessages.push({
                  at: '02/03/2019 10:12',
                  own: true,
                  id: Date.now().toString(),
                  authorName: 'Você',
                  status: 'sending',
                  medias: [
                    {
                      mediaType: files[uid].mediaType,
                      url: files[uid].data,
                      name: files[uid].name,
                      size: files[uid].size,
                    },
                  ],
                  title,
                }) - 1;
              return copyPrevMessages;
            });

            if (!error) {
              sendMediaToBackend(files[uid], title, id);
            }
          });
        }
      }}
      onMessageResend={id => {
        // mock sending to backend
        mockStatusMessage(id, 'sending');

        // mock error again sending the message
        setTimeout(() => mockStatusMessage(id, 'error'), 1000);
      }}
    />
  );
};

storiesOf(`Chat`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Chat Echo', () => (
    <div
      style={{
        width: '400px',
        height: '550px',
        position: 'fixed',
        right: '1em',
        bottom: '-50px',
      }}
    >
      {/* Only renders inside the given div */}
      <ChatWrapper isMaximizedOnly />
    </div>
  ))
  .add('Status Text', () => (
    <div
      style={{
        width: '400px',
        height: '550px',
        position: 'fixed',
        right: '1em',
        bottom: '-50px',
      }}
    >
      {/* Only renders inside the given div */}
      <ChatWrapper
        isMaximizedOnly
        initialMessages={[
          {
            at: '02/03/2019 10:12',
            own: false,
            id: `${Date.now().toString()}0`,
            authorName: 'Felipe Rodrigues',
            text: 'Olá, tudo bem?!',
            status: 'delivered',
          },
          {
            at: '02/03/2019 10:15',
            own: true,
            id: `${Date.now().toString()}2`,
            authorName: 'Você',
            text: 'Tudo sim!',
            status: 'delivered',
          },
          {
            at: '02/03/2019 10:14',
            own: true,
            id: `${Date.now().toString()}2`,
            authorName: 'Você',
            text: 'O que desaja solicitar ?',
            status: 'error',
          },
          {
            at: '02/03/2019 10:14',
            own: true,
            id: `${Date.now().toString()}2`,
            authorName: 'Você',
            text: 'Abraço!',
            status: 'sending',
          },
        ]}
      />
    </div>
  ))
  .add('Status Image', () => (
    <div
      style={{
        width: '400px',
        height: '550px',
        position: 'fixed',
        right: '1em',
        bottom: '-50px',
      }}
    >
      {/* Only renders inside the given div */}
      <ChatWrapper
        initialMessages={[
          {
            at: '02/03/2019 10:12',
            own: false,
            id: `${Date.now().toString()}0`,
            authorName: 'Felipe Rodrigues',
            status: 'delivered',
            medias: [
              {
                mediaType: 'image/png',
                url: 'http://www.invalidUrl123.com.br',
              },
            ],
          },
          {
            at: '02/03/2019 10:14',
            own: true,
            id: `${Date.now().toString()}2`,
            authorName: 'Você',
            medias: [
              {
                mediaType: 'image/png',
                url: 'http://www.invalidUrl123.com.br',
              },
            ],
            status: 'error',
          },
          {
            at: '02/03/2019 10:14',
            own: true,
            id: `${Date.now().toString()}2`,
            authorName: 'Você',
            medias: [
              {
                mediaType: 'image/png',
                url: 'http://www.invalidUrl123.com.br',
              },
            ],
            status: 'sending',
          },
        ]}
        isMaximizedOnly
      />
    </div>
  ))
  .add('Error Connection', () => (
    <div
      style={{
        width: '400px',
        height: '550px',
        position: 'fixed',
        right: '1em',
        bottom: '-50px',
      }}
    >
      <ChatWrapper isMaximizedOnly error="Erro de conexão. Tente mais tarde!" />
    </div>
  ))
  .add('Chat Blocked', () => (
    <div
      style={{
        width: '400px',
        height: '550px',
        position: 'fixed',
        right: '1em',
        bottom: '-50px',
      }}
    >
      {/* Only renders inside the given div */}
      <ChatWrapper
        isMaximizedOnly
        isBlocked
        blockedMessage="Já se passaram 24h desde a última mensagem enviada pelo cliente, 
          por isso não é possível enviar nova mensagem por esse canal de comunicação, por favor, 
          entre em contato com o cliente por outro meio."
      />
    </div>
  ));
