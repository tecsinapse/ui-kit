import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { mdiFileUpload } from '@mdi/js';
import Icon from '@mdi/react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { ConfirmationAlert, Snackbar } from '@tecsinapse/ui-kit';
import { convertBytes } from './helper';
import { UpFile } from './UpFile';

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
    maxHeight: 300,
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
  messages,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUID, setSelectedUID] = useState('');
  const [snackbar, setSnackBar] = useState({
    show: false,
    variant: 'error',
    msg: '',
  });
  const { fileRemovedMessage } = messages;
  const classes = useStyle();
  const handleClose = () =>
    setSnackBar(prevSnack => ({
      show: false,
      variant: prevSnack.variant,
      msg: prevSnack.msg,
    }));

  return (
    <>
      <ConfirmationAlert
        show={showAlert}
        proceed={() => {
          setSnackBar({
            show: true,
            variant: 'warning',
            msg: fileRemovedMessage,
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
        onClose={handleClose}
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
        <>
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
                  noShowSnack={value[uid].noShowSnack && value[uid].noShowSnack}
                  filesize={convertBytes(value[uid].file.size)}
                  divider={Object.keys(value).length !== i + 1}
                  setShowAlert={setShowAlert}
                  setSelectedUID={setSelectedUID}
                  data={value[uid].data}
                  error={value[uid].error}
                  setSnackBar={setSnackBar}
                  messages={messages}
                  key={uid}
                />
              ))}
            </List>
          </div>
        </>
      )}
    </>
  );
}

PreviewList.defaultProps = {
  value: {},
  onDelete: () => {},
  headerLabel: null,
  noFileTopLabel: 'Upload Files',
  noFileBottomLabel: 'Appear Here',
  messages: {
    fileRemovedMessage: 'File removed from upload list',
    fileUploadedSucessfullyMessage: filename =>
      `${filename} uploaded successfully`,
    fileErroedMessage: (filename, error) => `${filename} error: ${error}`,
  },
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
  messages: PropTypes.shape({
    fileRemovedMessage: PropTypes.string,
    fileUploadedSucessfullyMessage: PropTypes.func,
    fileErroedMessage: PropTypes.func,
  }),
};
