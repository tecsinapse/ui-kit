import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CustomDateFnsUtils } from '../../utils/startWeekSunday';

export const PickersProvider = ({ children, locale = 'pt-BR' }) => (
  <MuiPickersUtilsProvider utils={CustomDateFnsUtils} locale={locale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
