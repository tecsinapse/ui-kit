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
    footermobile: {
      backgroundColor: '#fff',
    },
    logo: {
      maxHeight: '80%',
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
  } else if (variant === 'mobile') mobile = true;

  return (
    <Paper
      className={classNames(classes.root, {
        [classes.rootmobile]: mobile,
      })}
    >
      {headerImages && headerImages.length > 0 && (
        <div className={classes.imgHeader}>
          {headerImages.map(src => (
            <img src={src} alt="logo" className={classes.logo} />
          ))}
        </div>
      )}

      {headerImages && headerImages.length > 0 && variant !== 'mobile' && (
        <Divider />
      )}

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
      <Divider />
      <div
        className={classNames(classes.footer, {
          [classes.footermobile]: mobile,
        })}
      >
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
