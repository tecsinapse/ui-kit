import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import className from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mdiImageOff } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from '@material-ui/core';
import { isEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import { Button } from '../Buttons/Button';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  rootMobile: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  titleDiv: {
    textOverflow: 'ellipsis',
    flexBasis: '50%',
    flexGrow: 1,
  },
  titleDivMobile: {
    marginLeft: theme.spacing.unit,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    marginBottom: theme.spacing.unit,
    fontSize: '80%',
  },
  info: {
    position: 'absolute',
    margin: theme.spacing.unit,
    right: theme.spacing.unit,
    left: theme.spacing.unit,
    bottom: theme.spacing.unit * 2,
    display: 'flex',
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
  title,
  titleSize,
  titleColor,
  subtitle,
  subtitleSize,
  subtitleColor,
  buttonTitle,
  link,
  linkTarget,
  mobile,
}) => {
  const [showLoad, setShowLoad] = useState(true);
  const [showError, setShowError] = useState(false);

  const classes = useStyle();

  return (
    <div
      className={className(classes.root, {
        [classes.rootMobile]: mobile,
        [classes.cursorPointer]: !mobile && isEmptyOrNull(buttonTitle),
      })}
      onClick={
        !mobile
          ? () =>
              isEmptyOrNull(buttonTitle) ? window.open(link, linkTarget) : null
          : undefined
      }
      onKeyPress={!mobile ? () => null : undefined}
    >
      {showError && (
        <Icon
          path={mdiImageOff}
          size={4}
          color="white"
          className={classes.erroImage}
        />
      )}
      {showLoad && <CircularProgress className={classes.progress} />}
      <img
        src={backgroundImage || ''}
        alt=""
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
        <div
          className={className(classes.titleDiv, {
            [classes.titleDivMobile]: mobile,
          })}
        >
          <Typography
            className={classes.title}
            style={{ color: titleColor, fontSize: titleSize }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Typography
            className={classes.subtitle}
            style={{ color: subtitleColor, fontSize: subtitleSize }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
          {!isEmptyOrNull(buttonTitle) && (
            <Link
              component={Button}
              className={classes.button}
              underline="none"
              target={linkTarget}
              href={link}
            >
              {buttonTitle}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Slide.defaultProps = {
  backgroundImage: '',
  title: '',
  titleSize: 40,
  titleColor: 'white',
  subtitle: '',
  subtitleSize: 14,
  subtitleColor: 'white',
  buttonTitle: '',
  link: '',
  linkTarget: '_self',
  mobile: false,
};

Slide.propTypes = {
  /**
   * Image path to display on background.
   */
  backgroundImage: PropTypes.string,
  /**
   * Title of the slide.
   */
  title: PropTypes.string,
  /**
   * Title font size of the slide.
   */
  titleSize: PropTypes.number,
  /**
   * Title color style of the slide.
   */
  titleColor: PropTypes.string,
  /**
   * Subtitle of the slide.
   */
  subtitle: PropTypes.string,
  /**
   * Subtitle color style of the slide.
   */
  subtitleColor: PropTypes.string,
  /**
   * Subtitle font size of the slide.
   */
  subtitleSize: PropTypes.number,
  /**
   * Name to appear in the button.
   */
  buttonTitle: PropTypes.string,
  /**
   * Link to redirect when click on button or slide.
   */
  link: PropTypes.string,
  /**
   * Target attribute specifies where to open the link.
   */
  linkTarget: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  /**
   * Boolean informing if the component should be rendered in a mobile way
   */
  mobile: PropTypes.bool,
};

export default Slide;
