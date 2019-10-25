import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardMedia, IconButton } from '@material-ui/core';
import { mdiFile, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { defaultGreyDark, defaultGreyDisabled, defaultWhite } from '../colors';

const useStyle = makeStyles({
  rootPreview: {
    backgroundColor: defaultGreyDisabled,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  thumbnail: {
    // border: '2px dashed green',
    width: '65px',
    height: '65px',
    display: 'flex',
    justifyContent: 'center',
    marginRight: '0px',
    position: 'relative',
  },
  iconButtonClose: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'rgba(117, 117, 117, 0.65)',
    padding: '3px',
    margin: '2px 1px',
    transition: 'opacity 0.25s',
    '&:hover': {
      backgroundColor: 'rgba(117, 117, 117, 0.85)',
    },
  },
  card: {
    margin: '5px 10px',
  },
});

const getMediaComponent = (mediaType, name, data) => {
  let component = 'div';

  if (mediaType.startsWith('image')) {
    component = 'img';
  } else if (mediaType.startsWith('video')) {
    component = 'video';
  } else {
    return (
      <div
        style={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon path={mdiFile} size={2} color={defaultGreyDark} />
      </div>
    );
  }

  return <CardMedia component={component} alt={name} title={name} src={data} />;
};

export function PreviewList({ files, setFiles }) {
  const classes = useStyle();

  return (
    <div className={classes.rootPreview}>
      <div className={classes.flexContainer}>
        {Object.keys(files).map(uid => (
          <Card key={uid} classes={{ root: classes.card }}>
            <div className={classes.thumbnail}>
              {getMediaComponent(
                files[uid].mediaType,
                files[uid].name,
                files[uid].data
              )}
              <IconButton
                key="remove"
                onClick={() =>
                  setFiles(filesCurrent => {
                    const filesCopy = { ...filesCurrent };
                    delete filesCopy[uid];
                    return filesCopy;
                  })
                }
                className={classes.iconButtonClose}
              >
                <Icon path={mdiClose} size={0.5} color={defaultWhite} />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
