import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import className from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mdiFileImage } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '../Buttons/Button';

const useStyle = bi =>
  makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      position: 'relative',
      width: '100%',
      height: '100%',
      //   backgroundImage: `url(${bi})`,
      //   backgroundSize: 'cover',
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
      height: '100%',
      objectFit: 'cover',
      opacity: '0.4',
    },
    progress: {
      zIndex: -1,
      top: '50%',
      left: '50%',
      position: 'absolute',
    },
    erroImage: {
      opacity: '0.4',
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
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
  const [showLoad, setShowLoad] = useState(true);
  const [showError, setShowError] = useState(false);

  const classes = useStyle(backgroundImage)();

  /*
 
    */

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div
        className={className(classes.root, {
          [classes.rootMobile]: mobile,
        })}
        onClick={!mobile ? () => (link ? window.open(link) : null) : undefined}
        onKeyPress={!mobile ? () => null : undefined}
      >
        {showError && (
          <Icon
            path={mdiFileImage}
            size={4}
            color="white"
            className={classes.erroImage}
          />
        )}
        {showLoad && <CircularProgress className={classes.progress} />}
        <img
          src={backgroundImage}
          alt=""
          title="image"
          className={classes.imageBackground}
          onLoad={e => {
            e.stopPropagation();
            setShowLoad(false);
          }}
          onError={e => {
            e.stopPropagation();
            if (showLoad) {
              setShowLoad(false);
            }
            if (!showError) {
              setShowError(true);
            }
          }}
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
            <Typography variant="subtitle2" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="caption" className={classes.subtitle}>
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
