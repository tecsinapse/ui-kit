import { Typography } from '@material-ui/core';
import React from 'react';
import { isMedia } from '../utils';
import { Media } from './Media';

export const PreviewHeader = ({ headerType, headerText, media, classes }) =>
  isMedia(headerType) ? (
    <Media media={media} header={headerType} classes={classes} />
  ) : (
    <Typography className={classes.textHeader}>{headerText}</Typography>
  );
