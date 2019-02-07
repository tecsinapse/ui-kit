import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette, spacing }) => ({
  marginLeft: {
    marginLeft: `${spacing.unit / 2}px !important`,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
export const DefaultProductTypography = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <div className={classes.flexRow}>
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          color="secondary"
          classes={{ root: classes.marginLeft }}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
