import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { isNotUndefOrNull } from '@tecsinapse/es-utils/build/object';

const useStyles = makeStyles(theme => ({
  titleColor: {
    color: ({ titleColor }) => {
      return isNotUndefOrNull(titleColor) ? titleColor : null;
    },
  },
  subtitleColor: {
    color: ({ subtitleColor }) => {
      return isNotUndefOrNull(subtitleColor) ? subtitleColor : null;
    },
  },
  marginLeft: {
    marginLeft: `${theme.spacing(0.5)}px !important`,
    fontWeight: 900,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
export const DefaultProductTypography = ({ title, subtitle, styleProps }) => {
  const classes = useStyles(styleProps);
  return (
    <div className={classes.flexRow}>
      <Typography variant="h6" color="inherit" className={classes.titleColor}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          color="secondary"
          classes={{ root: classes.marginLeft }}
          className={classes.subtitleColor}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
