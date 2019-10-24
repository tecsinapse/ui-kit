import React from 'react';
import { ThemeProvider } from '@livechat/ui-kit';

const getTheme = materialTheme => ({
  AgentBar: {
    Avatar: {},
    css: {
      backgroundColor: materialTheme.palette.primary.main,
      borderRadius: `${materialTheme.spacing(0.5)}px ${materialTheme.spacing(
        0.5
      )}px 0px 0px`,
    },
  },
  FixedWrapperMaximized: {
    animationDuration: 100,
    css: {
      boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
      borderRadius: `${materialTheme.spacing(1)}px`,
      position: 'inherit',
      right: 0,
      left: 0,
      width: '100%',
      padding: 0,
      margin: 0,
    },
  },
  FixedWrapperMinimized: {
    animationDuration: 100,
  },
  FixedWrapperRoot: {
    css: {
      position: 'inherit',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      padding: 0,
      margin: 0,
    },
  },
  Message: {
    own: {
      horizontalAlign: 'right',
      Bubble: {
        css: {
          backgroundColor: '#817e7d', // it is not materialized!
          boxShadow: `0 ${materialTheme.spacing(
            1 / 6
          )}px ${materialTheme.spacing(1 / 3)}px rgba(0,0,0,0.1)`,
          borderRadius: `${materialTheme.spacing(
            1
          )}px 0px ${materialTheme.spacing(1)}px ${materialTheme.spacing(1)}px`,
        },
      },
      Content: {
        css: {
          alignItems: 'flex-end',
        },
      },
      MessageMeta: {
        css: {
          textAlign: 'right',
        },
      },
    },
    // Not own message properties
    Bubble: {
      css: {
        backgroundColor: ' #ffffff', // it is not materialized!
        borderRadius: `0 ${materialTheme.spacing(1)}px ${materialTheme.spacing(
          1
        )}px ${materialTheme.spacing(1)}px`,
      },
    },
    horizontalAlign: 'left',
  },
  MessageList: {
    css: {
      backgroundColor: '#f2f2f2', // it is not materialized
      height: '100%',
    },
  },
  TextComposer: {
    inputColor: '#000', // this is a color for text, but sounds like a color for background
    Icon: {
      css: {
        height: '26px',
        width: '24px',
      },
    },
    css: {
      borderRadius: `0px 0px ${materialTheme.spacing(
        0.5
      )}px ${materialTheme.spacing(0.5)}px `,
    },
  },

  // Let unset the components that our chat is not using
  Avatar: {},
  Bubble: {},
  Button: {},
  ChatListItem: {
    Avatar: {},
  },
  QuickReply: {},
  TitleBar: {},
  MessageButtons: {},
  MessageGroup: {},
  MessageMedia: {},
  MessageText: {
    css: {
      padding: `${materialTheme.spacing(0.75)}px ${materialTheme.spacing(
        0.75
      )}px ${materialTheme.spacing(0.75)}px ${materialTheme.spacing(0.75)}px`,
    },
  },
  MessageTitle: {},
});

const ChatTheme = ({ children, materialTheme }) => (
  <ThemeProvider theme={getTheme(materialTheme)}>{children}</ThemeProvider>
);
export default ChatTheme;
