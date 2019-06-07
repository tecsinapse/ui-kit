import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '../Buttons/Button';
import Poweredby from './poweredby.svg';
import { defaultGreyLight3 } from '../colors';

const useStyle = rememberBox =>
  makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    imgHeader: {
      display: 'flex',
      justifyContent: 'space-evenly',
      height: '150px',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '5%',
      marginRight: '5%',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '60px',
      backgroundColor: defaultGreyLight3,
    },
    logo: {
      maxHeight: '80%',
    },
    footerImg: {
      width: '20%',
    },
    inputData: {
      alignSelf: 'stretch',
      marginTop: theme.spacing(1),
    },
    extra: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: rememberBox ? 'space-between' : 'flex-end',
      marginTop: theme.spacing(1),
    },
    submit: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    forgot: {
      alignSelf: 'center',
    },
    header: {
      marginTop: theme.spacing(2),
    },
    formControlLabelCheck: {
      height: theme.spacing(1),
    },
    checkbox: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  }));

export const Login = ({
  headerImages,
  headerText,
  subheaderText,
  rememberBox,
  forgotPassword,
  buttonLabel,
  rememberLabel,
  onClick,
  children,
  footerImg,
}) => {
  const [remember, setRemember] = useState(false);

  const classes = useStyle(rememberBox)();

  return (
    <Paper className={classes.root}>
      {headerImages && headerImages.length > 0 && (
        <div className={classes.imgHeader}>
          {headerImages.map(src => (
            <img src={src} alt="logo" className={classes.logo} />
          ))}
        </div>
      )}

      {headerImages && headerImages.length > 0 && <Divider />}

      <div className={classes.content}>
        {headerText && subheaderText && (
          <div className={classes.header}>
            <Typography variant="h5">{headerText}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subheaderText}
            </Typography>
          </div>
        )}

        <div className={classes.inputData}>
          {children}

          <div className={classes.extra}>
            {rememberBox && (
              <FormControlLabel
                className={classes.formControlLabelCheck}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    name="rememberMe"
                    checked={remember}
                    onChange={() => setRemember(oldRemember => !oldRemember)}
                    color="default"
                  />
                }
                label={
                  <Typography color="textSecondary">{rememberLabel}</Typography>
                }
              />
            )}
            {forgotPassword && forgotPassword.component && (
              <Typography
                className={classes.forgot}
                variant="subtitle2"
                color="secondary"
                component={forgotPassword.component}
                {...forgotPassword.props}
              >
                {forgotPassword.label}
              </Typography>
            )}
          </div>
          <Button
            size="large"
            className={classes.submit}
            variant="primary"
            onClick={() => (rememberBox ? onClick(remember) : onClick())}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
      <Divider />
      <div className={classes.footer}>
        {footerImg ? (
          { footerImg }
        ) : (
          <Poweredby className={classes.footerImg} />
        )}
      </div>
    </Paper>
  );
};

Login.defaultProps = {
  headerImages: [],
  headerText: null,
  subheaderText: null,
  rememberBox: false,
  forgotPassword: null,
  buttonLabel: 'Acessar o Sistema',
  rememberLabel: 'Lembrar de mim',
  onClick: () => {},
  footerImg: null,
};

Login.propTypes = {
  headerImages: PropTypes.arrayOf(PropTypes.string),
  headerText: PropTypes.string,
  subheaderText: PropTypes.string,
  rememberBox: PropTypes.bool,
  forgotPassword: PropTypes.shape({
    component: PropTypes.node,
    props: PropTypes.object,
    label: PropTypes.string,
  }),
  buttonLabel: PropTypes.string,
  rememberLabel: PropTypes.string,
  onClick: PropTypes.func,
  footerImg: PropTypes.object,
};
