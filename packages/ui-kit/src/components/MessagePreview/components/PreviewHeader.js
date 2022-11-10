import { Typography } from '@material-ui/core';
import React from 'react';
import { isMedia } from '../utils/utils';
import { Media } from './Media';

export const PreviewHeader = (header, media, classes) => {
  const MediaHeader = () => {
    if (isMedia(header)) {
      return <Media media={media} header={header} classes={classes} />;
    }

    return undefined;
  };

  const TextHeader = () => {
    if (!isMedia(header) && header) {
      return <Typography className={classes.textHeader}>{header}</Typography>;
    }

    return undefined;
  };

  return MediaHeader() || TextHeader();
};
