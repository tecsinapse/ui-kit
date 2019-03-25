import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { isImage } from './helper';

const useStyle = makeStyles({
  item: {
    backgroundColor: '#8080801c',
    borderRadius: '5px 5px 0px 0px ',
    marginTop: '5%',
  },
  primary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // border: '2px dashed blue',
    width: '110%',
  },
  info: {
    // border: '2px dashed red',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'baseline',
    flex: '2 1 auto',
  },
  img: {
    maxWidth: '75px',
    maxHeight: '75px',
    width: '55px',
    height: '55px',
    border: '2px dashed green',
    position: 'relative',
  },
  loading: {
    borderRadius: '0px 0px 5px 5px ',
  },
  barCompleted: {
    backgroundColor: '#22b5228c',
  },
});

export function UpFile({
  key,
  uid,
  filename,
  completed,
  filesize,
  setShowAlert,
  setSelectedUID,
  data,
}) {
  const classes = useStyle();

  const img = isImage(filename) ? (
    <img alt="presentation" src={data} className={classes.img} />
  ) : (
    <AttachFileIcon />
  );
  return (
    <React.Fragment>
      <ListItem key={key} className={classes.item}>
        <ListItemIcon>{img}</ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.primary}>
              <div className={classes.info}>
                <Typography variant="subtitle2" noWrap>
                  {filename}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  style={{ marginLeft: '5%' }}
                >
                  ({filesize})
                </Typography>
              </div>
              <IconButton
                onClick={() => {
                  setShowAlert(true);
                  setSelectedUID(uid);
                }}
              >
                <Clear />
              </IconButton>
            </div>
          }
        />
      </ListItem>
      <LinearProgress
        variant="determinate"
        value={completed}
        className={classes.loading}
        classes={
          completed >= 100
            ? {
                bar1Determinate: classes.barCompleted,
              }
            : null
        }
      />
    </React.Fragment>
  );
}
