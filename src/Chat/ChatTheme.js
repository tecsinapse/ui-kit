import React from 'react';
import { ThemeProvider } from '@livechat/ui-kit'

import {defaultOrange, defaultGreyLight2, defaultGreyLight3} from '../colors';

const getTheme = () => ({
    AgentBar: {
        Avatar: {},
        css: {
            backgroundColor: defaultOrange,
            borderRadius: '8px 8px 0 0',        
        },
    },
    FixedWrapperMaximized: {
        animationDuration: 100,
        width: '450px',
        height: '550px',
        css: {
            boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
    },
    FixedWrapperMinimized: {
        animationDuration: 100,
    },
    FixedWrapperRoot: {
        position: 'right',
        css: {},
    },
    Message: {
        own: {
            horizontalAlign: 'right',
            Bubble: {
                css: {
                    backgroundColor: "#817e7d",
                    borderRadius: '10px 0px 10px 10px',
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
              backgroundColor: ' #ffffff',
              borderRadius: '0 10px 10px 10px',
            },
        },
        horizontalAlign: 'left',

    },
    MessageList: {
        css: {
            backgroundColor: "#f2f2f2",
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
        IconButton: {
            active: {
                Icon: {},
            },
        },
        css: {
            borderRadius: '0 0 8px 8px',
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
            padding: '10px 10px 10px 10px',
        },
    },
    MessageTitle: {},
});

const ChatTheme = ({children}) => (
    <ThemeProvider theme={getTheme()} >
        {children}
    </ThemeProvider>

);
export default ChatTheme;

