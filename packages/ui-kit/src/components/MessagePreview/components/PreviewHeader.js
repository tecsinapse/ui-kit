import { Typography } from '@material-ui/core';
import React from 'react';
import { isMedia } from '../utils/utils';
import { Media } from './Media';

export const PreviewHeader = ({ header, media, classes }) =>
  isMedia(header) ? (
    <Media media={media} header={header} classes={classes} />
  ) : (
    <Typography className={classes.textHeader}>{header}</Typography>
  );
