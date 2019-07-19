import { Login, Input } from '@tecsinapse/ui-kit';
import React, { useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

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

export default function AppLogin() {
  return (
    <div style={{ width: '100%' }}>
      <Login
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1Ysq-vBrWoQVcFcxbP3vRn6QczE1AzOUh0qgeWZOKhi5WEFE"
        variant="mobile"
        headerImages={[
          'http://www.car-brand-names.com/wp-content/uploads/2015/05/Mercedes-Benz-logo.png',
        ]}
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
          style={{ width: '100%', backgroundColor: '#fff' }}
          startAdornment={<AccountCircle />}
        />
        <InputPassword />
      </Login>
    </div>
  );
}
