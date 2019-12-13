import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export const PickersProvider = ({ children, locale = 'pt-BR' }) => (
  <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
