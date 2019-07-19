import React from 'react';

export const LocaleContext = React.createContext({
  selectPromptMessage: 'Selecione',
  selectAllMessage: 'Selecionar todos',
  Wizard: {
    stepText: 'Step',
    backText: 'Voltar',
    nextText: 'AVANÇAR',
    finishText: 'FINALIZAR',
  },
  Table: {
    labelRowsPerPage: 'Linhas por página:',
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count}`,
    tooltipAdvancedFilter: 'Filtros Avançados',
    applyFiltersLabel: 'Aplicar Filtros',
    selectedFiltersLabel: 'Filtros Selecionados',
    emptyStateTitle: 'Nada por aqui',
    emptyStateMessage: 'Não existem dados para exibição.',
  },
  Picker: {
    todayLabel: 'HOJE',
    okLabel: 'Filtrar',
    cancelLabel: 'Cancelar',
    clearLabel: 'Limpar',
  },
});

export function LocaleProvider({ messages, children }) {
  return (
    <LocaleContext.Provider value={messages}>{children}</LocaleContext.Provider>
  );
}
