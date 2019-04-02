import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '../Buttons/Button';
import Tecsinapese from './tecsinapse.svg';

const useStyle = makeStyles(theme => ({
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
    alignItems: 'center',
    flexBasis: '28%',
    height: '30%',
  },
  content: {
    flexBasis: '60%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: '5%',
    marginRight: '5%',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '12%',
    backgroundColor: '#8080801f',
  },
  logo: {
    flexBasis: '20%',
    width: '10%',
  },
  footerImg: {
    flexBasis: '30%',
    width: '25%',
  },
  inputData: {
    alignSelf: 'stretch',
  },
  extra: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  submit: {
    marginRight: '40%',
  },
  esqueceu: {
    alignSelf: 'center',
  },
}));

export const Login = ({
  headerImages,
  headerText,
  subheaderText,
  rememberBox,
  forgotPasswordComponent,
  buttonLabel,
  rememberLabel,
  onClick,
  children,
  footerLabel,
  footerImg,
}) => {
  const [remember, setRemember] = useState(false);

  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      {headerImages && headerImages.length > 0 ? (
        <div className={classes.imgHeader}>
          {headerImages.map(src => (
            <img src={src} alt="logo" className={classes.logo} />
          ))}
        </div>
      ) : null}

      {headerImages && headerImages.length > 0 ? <Divider /> : null}

      <div className={classes.content}>
        {headerText || subheaderText ? (
          <div className={classes.header}>
            <Typography variant="h5">{headerText}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subheaderText}
            </Typography>
          </div>
        ) : null}

        <div className={classes.inputData}>
          {children}

          {rememberBox || forgotPasswordComponent ? (
            <div className={classes.extra}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={() => setRemember(oldRemember => !oldRemember)}
                    color="default"
                  />
                }
                label={
                  <Typography color="textSecondary">{rememberLabel}</Typography>
                }
              />
              <Typography
                className={classes.esqueceu}
                variant="subtitle2"
                color="secondary"
                component={forgotPasswordComponent}
              >
                Esqueceu a senha?
              </Typography>
            </div>
          ) : null}
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
      <Divider />
      <div className={classes.footer}>
        <Typography variant="caption" color="textSecondary">
          {footerLabel}
        </Typography>
        {footerImg ? (
          { footerImg }
        ) : (
          <Tecsinapese className={classes.footerImg} />
        )}
      </div>
    </Paper>
  );
};

Login.defaultProps = {
  headerImages: [],
  headerText: null,
  subheaderText: null,
  rememberBox: true,
  forgotPasswordComponent: null,
  buttonLabel: 'Acessar o Sistema',
  rememberLabel: 'Lembrar de mim',
  onClick: () => {},
  footerLabel: 'POWERED BY',
  footerImg: null,
};

Login.propTypes = {
  headerImages: PropTypes.arrayOf(PropTypes.string),
  headerText: PropTypes.string,
  subheaderText: PropTypes.string,
  rememberBox: PropTypes.bool,
  forgotPasswordComponent: PropTypes.node,
  buttonLabel: PropTypes.string,
  rememberLabel: PropTypes.string,
  onClick: PropTypes.func,
  footerLabel: PropTypes.string,
  footerImg: PropTypes.object,
};
