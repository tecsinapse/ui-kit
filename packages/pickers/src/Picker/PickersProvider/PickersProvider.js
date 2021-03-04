import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CustomLuxonUtils } from 'utils/startWeekSunday'; // eslint-disable-line import/no-unresolved

export const PickersProvider = ({ children, locale = 'pt-BR' }) => (
  <MuiPickersUtilsProvider utils={CustomLuxonUtils} locale={locale}>
    {children}
  </MuiPickersUtilsProvider>
);
export default PickersProvider;
