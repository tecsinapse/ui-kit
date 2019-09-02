import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Login } from './Login';
import { Input } from '../Inputs/Input';
import { DivFlex } from '../withFlexCenter';
import { headerImages1, headerImages2 } from './headerImages';

const InputPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      name="login_senha"
      label="Senha"
      style={{ width: '100%', backgroundColor: '#fff' }}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(showPasswordOld => !showPasswordOld)}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
};

storiesOf(`Login`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Login', () => (
    <div style={{ width: '400px', height: '600px' }}>
      <Login
        headerImages={headerImages1}
        rememberBox
        forgotPassword={{
          label: 'Esqueceu a senha?',
          component: 'a',
          props: { href: 'http://www.google.com.br' },
        }}
        onClick={remember => /* console.log("Login:", remember) */ null}
        buttonLabel="Acessar ao Sistema"
      >
        <Input
          name="login_email"
          label="E-mail"
          style={{ width: '100%' }}
          startAdornment={<AccountCircle />}
        />
        <InputPassword />
      </Login>
    </div>
  ))
  .add('Recupera', () => (
    <div style={{ width: '400px' }}>
      <Login
        rememberBox={false}
        headerImages={headerImages2}
        headerText={<Typography variant="h5">Recuperação de Senha</Typography>}
        subheaderText="Informe abaixo o seu e-mail cadastrado no sistema."
        buttonLabel="Enviar nova senha"
        onClick={() => /* console.log("Recupera!!!!") */ null}
      >
        <Input
          name="recupera"
          label="E-mail cadastrado"
          style={{ width: '100%' }}
          startAdornment={<AccountCircle />}
        />
      </Login>
    </div>
  ));
