import { Typography } from '@material-ui/core';
import React from 'react';
import { Media } from './Media';
import {isMedia} from "../utils/utils";

export const PreviewHeader = ({ headerType, headerText, media, classes }) =>
  isMedia(headerType) ? (
    <Media media={media} header={headerType} classes={classes} />
  ) : (
    <Typography className={classes.textHeader}>{headerText}</Typography>
  );
