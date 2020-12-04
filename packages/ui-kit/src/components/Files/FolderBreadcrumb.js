import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Folder from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { defaultGreyLight2 } from 'utils/colors';

const useStyles = (light, dense) =>
  makeStyles(theme => ({
    marginLeft: {
      marginLeft: `${theme.spacing(0.5)}px !important`,
    },
    breadcrumb: { display: 'flex !important' },
    link: {
      color: `${light ? defaultGreyLight2 : 'black'} !important`,
    },
    noMarginLeft: {
      marginLeft: '0px !important',
    },
    separator: {
      color: defaultGreyLight2,
    },
    flex: {
      display: 'flex',
      '& > :last-child': {
        marginLeft: dense ? theme.spacing(0.5) : theme.spacing(1),
      },
    },
  }));

export const FolderBreadcrumb = ({
  breadcrumbs,
  light = false,
  dense = false,
}) => {
  const classes = useStyles(light, dense)();

  return (
    <Breadcrumbs
      classes={{ root: classes.breadcrumb }}
      separator={
        <NavigateNextIcon fontSize="small" className={classes.separator} />
      }
      arial-label="Breadcrumb"
    >
      {breadcrumbs.map(current => {
        const isLink = typeof current === 'object';
        const key = isLink ? current.title : current;
        const BodyContent = (
          <>
            <Folder fontSize="small" className={classes.separator} />
            <Typography
              key={current}
              variant="subtitle2"
              color="textSecondary"
              classes={{ root: classes.link }}
            >
              {key}
            </Typography>
          </>
        );

        return (
          <div key={key} className={classes.flex}>
            {isLink ? (
              <Link
                key={current.title}
                component={current.component}
                variant="subtitle2"
                classes={{
                  root: clsx(classes.link, classes.flex, classes.noMarginLeft),
                }}
                {...current.componentProps}
              >
                {BodyContent}
              </Link>
            ) : (
              BodyContent
            )}
          </div>
        );
      })}
      ;
    </Breadcrumbs>
  );
};
FolderBreadcrumb.propTypes = {
  /** If component is `a`, you can pass `{ href: URL }` as `componentProps` */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
          .isRequired,
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        componentProps: PropTypes.object,
      }),
    ])
  ).isRequired,
  light: PropTypes.bool,
  dense: PropTypes.bool,
};
FolderBreadcrumb.defaultProps = {
  light: false,
  dense: false,
};
