import React from 'react';

export const LocaleContext = React.createContext({
  selectPromptMessage: 'Selecione',
  selectAllMessage: 'Selecionar todos',
});

export function LocaleProvider({ messages, children }) {
  return (
    <LocaleContext.Provider value={messages}>{children}</LocaleContext.Provider>
  );
}
