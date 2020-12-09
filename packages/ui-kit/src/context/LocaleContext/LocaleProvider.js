import React from 'react';
import { LocaleContext } from 'context/LocaleContext/LocaleContext';

export function LocaleProvider({ messages, children }) {
  return (
    <LocaleContext.Provider value={messages}>{children}</LocaleContext.Provider>
  );
}
