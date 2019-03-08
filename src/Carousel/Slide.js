import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyle = backImg =>
  makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      position: 'relative',
    },
    titleDiv: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      flexBasis: '50%',
      flexGrow: 1,
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#fff',
    },
    subtitle: {
      color: '#fff',
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
    cra: {
      display: 'block',
      height: '100%',
      width: '100%',
      textDecoration: 'none',
    },
  });

function Slide({
  backgroundImage,
  titleImage,
  title,
  subtitle,
  link,
  ...other
}) {
  const classes = useStyle(backgroundImage)();

  return (
    <div className={classes.root}>
      <img
        src={backgroundImage}
        alt=""
        title="image"
        style={{ width: '100%' }}
      />
      <div className={classes.info}>
        <div className={classes.titleImage}>
          {<img src={titleImage} alt="" />}
        </div>
        <div className={classes.titleDiv}>
          <Typography variant="title" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </div>
      </div>
    </div>
  );
}

Slide.defaultProps = {
  titleImage: '',
  title: '',
  subtitle: '',
  link: '',
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
};

export default Slide;
