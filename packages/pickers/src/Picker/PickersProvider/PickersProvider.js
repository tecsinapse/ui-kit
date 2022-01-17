import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

export const PickersProvider = ({ children, locale = ptBR }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
