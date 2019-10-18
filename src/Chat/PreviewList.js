import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardMedia, IconButton } from '@material-ui/core';
import { mdiFile, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

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
        <Icon path={mdiFile} size={2} color="#817e7d" />
      </div>
    );
  }

  return <CardMedia component={component} alt={name} title={name} src={data} />;
};

export function PreviewList({ files, setFiles }) {
  const classes = useStyle();

  return (
    <div style={{ backgroundColor: '#c5c5c5b3' }}>
      <div className={classes.flexContainer}>
        {Object.keys(files).map((uid, i) => (
          <Card key={uid} style={{ margin: '5px 10px' }}>
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
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: 'rgba(117, 117, 117, 0.75)',
                  padding: '3px',
                  margin: '2px 1px',
                }}
              >
                <Icon path={mdiClose} size={0.5} color="white" />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
