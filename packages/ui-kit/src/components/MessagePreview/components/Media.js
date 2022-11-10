import React from 'react';
import Icon from '@mdi/react';
import { mdiCamera, mdiFileDocumentOutline, mdiVideoOutline } from '@mdi/js';
import { DOCUMENT, IMAGE, VIDEO } from '../utils/utils';

export const Media = ({ header, media, classes }) => {
  const MediaImage = () => {
    if (media) {
      return <img className={classes.image} src={media} alt={header} />;
    }

    return <Icon path={mdiCamera} size={5} />;
  };

  const MediaVideo = () => <Icon path={mdiVideoOutline} size={5} />;

  const MediaDocument = () => <Icon path={mdiFileDocumentOutline} size={5} />;

  return (
    <div className={classes.image}>
      {IMAGE.includes(header) && MediaImage()}
      {VIDEO.includes(header) && MediaVideo()}
      {DOCUMENT.includes(header) && MediaDocument()}
    </div>
  );
};
