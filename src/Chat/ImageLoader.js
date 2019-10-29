import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mdiImageOff } from '@mdi/js';
import Icon from '@mdi/react';

const ImageLoader = ({ classes, url, own }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={
        loading || imageError ? classes.emptyBubble : classes.thumbnail
      }
    >
      {loading && !imageError && (
        <CircularProgress className={classes.progress} />
      )}
      {imageError && (
        <Icon
          path={mdiImageOff}
          size={1}
          color={own ? 'white' : 'black'}
          className={classes.imageError}
        />
      )}
      <img
        src={url}
        alt="description"
        onLoad={e => {
          e.stopPropagation();
          setLoading(false);
        }}
        onError={e => {
          e.stopPropagation();
          if (loading) {
            setLoading(false);
          }
          if (!imageError) {
            setImageError(true);
          }
        }}
      />
    </div>
  );
};
export default ImageLoader;
