import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import FolderOpen from '@material-ui/icons/FolderOpen';
import SignalWifiOff from '@material-ui/icons/SignalWifiOff';
import PropTypes from 'prop-types';

const styles = {
  container: {
    display: 'flex' /* establish flex container */,
    flexGrow: 1,
    flexDirection: 'column' /* make main axis vertical */,
    justifyContent: 'center' /* center items vertically, in this case */,
    alignItems: 'center' /* center items horizontally, in this case */,
  },
  box: {
    textAlign: 'center',
  },
  icon: {
    marginTop: '10px',
    fontSize: 70,
  },
};

const mensagensTitulo = [
  'Hummmmm',
  'Alowwww',
  'Xiiiiii',
  'Eitaaaaa',
  'Nooossa',
];

export const EmptyState = withStyles(styles)(
  ({
    IconComponent = FolderOpen,
    classes,
    titleMessage,
    message,
    noConnectionTitle,
    offlineMessage,
    children,
  }) => {
    const messagemTitulo =
      titleMessage ||
      mensagensTitulo[Math.floor(Math.random() * mensagensTitulo.length)];
    const Icon = navigator.onLine ? IconComponent : SignalWifiOff;
    return (
      <div className={classes.container}>
        <div className={classes.box}>
          <Icon color="disabled" className={classes.icon} />
          <Typography variant="h6" gutterBottom>
            {navigator.onLine ? messagemTitulo : noConnectionTitle}
            ...
          </Typography>
          <Typography variant="body2" gutterBottom>
            {navigator.onLine ? message : offlineMessage}
          </Typography>
          {children}
        </div>
      </div>
    );
  }
);
export const EmptyStateWrapper = ({ children, ...props }) =>
  children && children.length ? children : <EmptyState {...props} />;

EmptyState.defaultProps = {
  titleMessage: null,
  message: 'Não há nada por aqui ainda.',
  offlineMessage: 'Podem existir resultados, mas por enquanto não temos nada.',
  noConnectionTitle: 'Sem conexão',
  IconComponent: FolderOpen,
};
EmptyState.propTypes = {
  IconComponent: PropTypes.func,
  titleMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  noConnectionTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  offlineMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
