import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FolderOpen from '@material-ui/icons/FolderOpen';
import SignalWifiOff from '@material-ui/icons/SignalWifiOff';
import PropTypes from 'prop-types';

const useStyle = makeStyles(() => ({
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
}));

const mensagensTitulo = [
  'Hummmmm',
  'Alowwww',
  'Xiiiiii',
  'Eitaaaaa',
  'Nooossa',
];

export const EmptyState = ({
  IconComponent = FolderOpen,
  titleMessage,
  message,
  noConnectionTitle,
  offlineMessage,
  children,
}) => {
  const classes = useStyle();
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
};

EmptyState.defaultProps = {
  titleMessage: null,
  message: 'Não há nada por aqui ainda.',
  offlineMessage: 'Podem existir resultados, mas por enquanto não temos nada.',
  noConnectionTitle: 'Sem conexão',
  IconComponent: FolderOpen,
};

EmptyState.propTypes = {
  /** Icon to be displayed */
  IconComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** Custom message title */
  titleMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Custom message */
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Custom message title when no connection available */
  noConnectionTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Custom message when offline */
  offlineMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default EmptyState;
