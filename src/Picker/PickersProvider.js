import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

export const PickersProvider = ({ children, locale = 'pt-BR' }) => (
  <MuiPickersUtilsProvider utils={LuxonUtils} locale={locale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
