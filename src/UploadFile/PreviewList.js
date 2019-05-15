import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { mdiFileUpload } from '@mdi/js';
import Icon from '@mdi/react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { convertBytes } from './helper';
import { ConfirmationAlert } from '../Alerts/ConfirmationAlert';
import { UpFile } from './UpFile';
import { Snackbar } from '../Notifications/Snackbar';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  scrollHiddenBar: {
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    height: '200px',
    width: '200px',
    borderRadius: '50%',
  },
  icon: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  list: {},
  unavailableColor: {
    color: '#cacacb',
  },
  iconColor: {
    backgroundColor: '#f7f7f7',
  },
});

export function PreviewList({
  value,
  onDelete,
  headerLabel,
  noFileTopLabel,
  noFileBottomLabel,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUID, setSelectedUID] = useState('');
  const [snackbar, setSnackBar] = useState({
    show: false,
    variant: 'error',
    msg: '',
  });

  const classes = useStyle();

  return (
    <React.Fragment>
      <ConfirmationAlert
        show={showAlert}
        proceed={() => {
          setSnackBar({
            show: true,
            variant: 'warning',
            msg: `File removed from upload list`,
          });
          setShowAlert(false);
          onDelete(selectedUID);
        }}
        cancel={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
        dismiss={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
      />
      <Snackbar
        show={snackbar.show}
        variant={snackbar.variant}
        onClose={() =>
          setSnackBar(prevSnack => ({
            show: false,
            variant: prevSnack.variant,
            msg: prevSnack.msg,
          }))
        }
      >
        {snackbar.msg}
      </Snackbar>

      {Object.keys(value).length <= 0 ? (
        <div className={classes.root}>
          <div className={classes.circle}>
            <Icon path={mdiFileUpload} size={2} className={classes.iconColor} />

            <Typography
              variant="h5"
              color="primary"
              className={classes.text}
              classes={{ colorPrimary: classes.unavailableColor }}
            >
              {noFileTopLabel}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              className={classes.text}
              classes={{ colorPrimary: classes.unavailableColor }}
            >
              {noFileBottomLabel}
            </Typography>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {headerLabel && (
            <div>
              <Typography variant="h6">{headerLabel}</Typography>
              <Divider style={{ marginTop: '2%' }} />
            </div>
          )}
          <div className={classes.scrollHiddenBar}>
            <List className={classes.list}>
              {Object.keys(value).map((uid, i) => (
                <UpFile
                  uid={uid}
                  filename={value[uid].file.name}
                  completed={value[uid].completed}
                  filesize={convertBytes(value[uid].file.size)}
                  divider={Object.keys(value).length !== i + 1}
                  setShowAlert={setShowAlert}
                  setSelectedUID={setSelectedUID}
                  data={value[uid].data}
                  error={value[uid].error}
                  setSnackBar={setSnackBar}
                  key={uid}
                />
              ))}
            </List>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

PreviewList.defaultProps = {
  value: {},
  onDelete: () => {},
  headerLabel: null,
  noFileTopLabel: 'Upload Files',
  noFileBottomLabel: 'Appear Here',
};

PreviewList.propTypes = {
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
    error: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  headerLabel: PropTypes.string,
  noFileBottomLabel: PropTypes.string,
  noFileTopLabel: PropTypes.string,
};
