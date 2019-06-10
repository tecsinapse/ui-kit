import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '../Buttons/Button';
import Poweredby from './poweredby.svg';
import { defaultGreyLight3 } from '../colors';

const useStyle = (rememberBox, backgroundImage) =>
  makeStyles(({ spacing }) => ({
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    rootmobile: {
      backgroundImage: `url(${backgroundImage})`,
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      left: '0',
      top: '0',
    },
    imgHeader: {
      display: 'flex',
      justifyContent: 'space-evenly',
      height: '150px',
      alignItems: 'center',
    },
    imgHeaderMobile: {
      flex: '1',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '5%',
      marginRight: '5%',
    },
    contentMobile: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '60px',
      backgroundColor: defaultGreyLight3,
    },
    footermobile: {
      backgroundColor: '#fff',
    },
    strechSelf: {
      alignSelf: 'stretch',
    },
    logo: {
      height: 'auto',
      maxWidth: '100%',
    },
    logoContainer: {
      display: 'block',
      textAlign: 'center',
      marginLeft: spacing.unit / 2,
      marginRight: spacing.unit / 2,
    },
    footerImg: {
      width: '20%',
    },
    inputData: {
      alignSelf: 'stretch',
      marginTop: spacing.unit,
    },
    extra: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: rememberBox ? 'space-between' : 'flex-end',
      marginTop: spacing.unit,
    },
    extramobile: {
      flexDirection: 'column',
    },
    submit: {
      marginTop: spacing.unit * 2,
      marginBottom: spacing.unit * 2,
    },
    forgot: {
      alignSelf: 'center',
    },
    forgotmobile: {
      marginTop: spacing.unit * 5,
    },
    header: {
      marginTop: spacing.unit * 2,
    },
    formControlLabelCheck: {
      height: spacing.unit,
      alignSelf: 'flex-start',
    },
    checkbox: {
      width: spacing.unit * 2,
      height: spacing.unit * 2,
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
  variant,
  backgroundImage,
}) => {
  const [remember, setRemember] = useState(false);

  const classes = useStyle(rememberBox, backgroundImage)();

  const matches = useMediaQuery(useTheme().breakpoints.down('xs'));

  let mobile = false;
  if (variant === 'auto') {
    if (matches) {
      mobile = true;
    }
  } else if (variant === 'mobile') {
    mobile = true;
  }

  const headerElem = headerImages && headerImages.length > 0 && (
    <div
      className={classNames(classes.imgHeader, {
        [classes.imgHeaderMobile]: mobile,
      })}
    >
      {headerImages.map(src => (
        <div className={classes.logoContainer}>
          <img src={src} alt="logo" key={src} className={classes.logo} />
        </div>
      ))}
    </div>
  );

  const contentElem = (
    <div
      className={classNames(classes.content, {
        [classes.contentMobile]: mobile,
      })}
    >
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

        <div
          className={classNames(classes.extra, {
            [classes.extramobile]: mobile,
          })}
        >
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
              className={classNames(classes.forgot, {
                [classes.forgotmobile]: mobile,
              })}
              variant="subtitle2"
              color={mobile ? 'textPrimary' : 'secondary'}
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
          fullWidth={mobile}
          variant="primary"
          onClick={() => (rememberBox ? onClick(remember) : onClick())}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );

  const footerElem = (
    <div
      className={classNames(classes.footer, {
        [classes.footermobile]: mobile,
      })}
    >
      <Divider className={classes.strechSelf} />
      {footerImg ? { footerImg } : <Poweredby className={classes.footerImg} />}
    </div>
  );

  if (mobile) {
    return (
      <div className={classNames(classes.root, classes.rootmobile)}>
        {headerElem}
        {contentElem}
        {footerElem}
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      {headerElem}
      {headerElem && <Divider />}
      {contentElem}
      {footerElem}
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
  variant: 'auto',
  backgroundImage: '',
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
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  backgroundImage: PropTypes.string,
};

export default Login;
