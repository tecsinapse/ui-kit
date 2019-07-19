import 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export const PickersProvider = ({ children }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
