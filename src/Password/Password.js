import React, { useState } from 'react';
import Lock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { omitDeep } from '@tecsinapse/es-utils/core/object';
import { Input } from '../Inputs/Input';

const Password = props => {
  const [passwordFieldType, setPasswordFieldType] = useState('password');

  const togglePasswordFieldType = () => {
    setPasswordFieldType(type => {
      if (type === 'password') {
        return 'text';
      }
      return 'password';
    });
  };

  const newProps = omitDeep(
    omitDeep(omitDeep(props, 'startAdornment'), 'endAdornment'),
    'type'
  );

  return (
    <Input
      {...newProps}
      type={passwordFieldType}
      startAdornment={<Lock />}
      endAdornment={
        <IconButton onClick={togglePasswordFieldType}>
          {passwordFieldType === 'text' ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
      endAdornmentMargin={false}
    />
  );
};

export default Password;
