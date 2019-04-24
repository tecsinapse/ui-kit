import './InstallStyles';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import React from 'react';
import ReactDOM from 'react-dom';
import AppLogin from './AppLogin';
import * as serviceWorker from './serviceWorker';

const Bla = () => (
  <ThemeProvider variant="orange">
    <AppLogin />
  </ThemeProvider>
);

ReactDOM.render(<Bla />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
