import React from 'react';
import Icon from '@mdi/react';
import { mdiImage, mdiPdfBox, mdiVideoBox } from '@mdi/js';
import { DOCUMENT, IMAGE, VIDEO } from '../utils/utils';

export const Media = ({ header, media, classes }) => {
  const MediaImage = () => {
    if (media) {
      return <img className={classes.image} src={media} alt={header} />;
    }

    return <Icon className={classes.icon} path={mdiImage} />;
  };

  const MediaVideo = () => <Icon className={classes.icon} path={mdiVideoBox} />;

  const MediaDocument = () => (
    <Icon className={classes.icon} path={mdiPdfBox} />
  );

  return (
    <div className={classes.image}>
      {IMAGE.includes(header) && <MediaImage />}
      {VIDEO.includes(header) && <MediaVideo />}
      {DOCUMENT.includes(header) && <MediaDocument />}
    </div>
  );
};
