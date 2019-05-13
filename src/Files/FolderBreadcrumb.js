import React from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Folder from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { defaultGreyLight2 } from '../colors';

const useStyles = makeStyles(({ palette, spacing }) => ({
  marginLeft: {
    marginLeft: `${spacing.unit / 2}px !important`,
  },
  breadcrumb: { display: 'flex !important' },
  link: {
    color: `black !important`,
  },
  separator: {
    color: defaultGreyLight2,
  },
  flex: { display: 'flex', '& > :last-child': { marginLeft: spacing.unit } },
}));

export const FolderBreadcrumb = ({ breadcrumbs }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs
      classes={{ root: classes.breadcrumb }}
      separator={
        <NavigateNextIcon fontSize="small" className={classes.separator} />
      }
      arial-label="Breadcrumb"
    >
      {breadcrumbs.map(current => (
        <div className={classes.flex}>
          <Folder fontSize="small" className={classes.separator} />
          <Typography
            key={current}
            variant="subtitle2"
            color="textSecondary"
            classes={{ root: classes.link }}
          >
            {current}
          </Typography>
        </div>
      ))}
    </Breadcrumbs>
  );
};

FolderBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
