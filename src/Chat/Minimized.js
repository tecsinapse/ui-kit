import React from 'react';
import { ChatIcon, IconButton } from '@livechat/ui-kit';

const Minimized = ({ maximize }) => (
  <div
    onClick={maximize}
    onKeyPress={e => e.preventDefault()}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      background: '#0093FF',
      color: '#fff',
      borderRadius: '50%',
      cursor: 'pointer',
    }}
  >
    <IconButton color="#fff">
      <ChatIcon />
    </IconButton>
  </div>
);
export default Minimized;
