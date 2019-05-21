import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import className from 'classnames';
import { Button } from '../Buttons/Button';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },
  rootMobile: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleDiv: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    flexBasis: '50%',
    flexGrow: 1,
  },
  titleDivMobile: {
    marginLeft: theme.spacing.unit,
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  titleImage: {
    alignSelf: 'flex-end',
  },
  info: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
  },
}));

export const Slide = ({
  backgroundImage,
  titleImage,
  title,
  subtitle,
  link,
  mobile,
  ...other
}) => {
  const classes = useStyle();

  return (
    <div
      className={className(classes.root, {
        [classes.rootMobile]: mobile,
      })}
      onClick={!mobile ? () => (link ? window.open(link) : null) : undefined}
      onKeyPress={!mobile ? () => null : undefined}
    >
      <img
        src={backgroundImage}
        alt=""
        title="image"
        className={classes.imageBackground}
      />
      <div className={classes.info}>
        {!mobile && (
          <div className={classes.titleImage}>
            {<img src={titleImage} alt="" />}
          </div>
        )}
        <div
          className={className(classes.titleDiv, {
            [classes.titleDivMobile]: mobile,
          })}
        >
          <Typography
            variant="subtitle2"
            className={classes.title}
            color="textPrimary"
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            color="inherit"
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
          {mobile && (
            <Button
              onClick={() => (link ? window.open(link) : null)}
              className={classes.button}
              size="small"
            >
              {' '}
              SABER MAIS{' '}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Slide.defaultProps = {
  titleImage: '',
  title: '',
  subtitle: '',
  link: '',
  mobile: false,
};

Slide.propTypes = {
  /**
   * Image path to display on background.
   */
  backgroundImage: PropTypes.string.isRequired,
  /**
   * Image path to display along with the title
   */
  titleImage: PropTypes.string,
  /**
   * Title of the slide.
   */
  title: PropTypes.string,
  /**
   * Subtitle of the slide.
   */
  subtitle: PropTypes.string,
  /**
   * Link to redirect when click on component
   */
  link: PropTypes.string,
  /**
   * Boolean informing if the component should be rendered in a mobile way
   */
  mobile: PropTypes.bool,
};
export default Slide;
