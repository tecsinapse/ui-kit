import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import className from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mdiImageOff } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '../Buttons/Button';

const useStyle = ({ titleColor }) =>
  makeStyles(theme => ({
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
      overflow: 'hidden',
      flexBasis: '50%',
      flexGrow: 1,
    },
    titleDivMobile: {
      marginLeft: theme.spacing.unit,
    },
    title: {
      fontWeight: 'bold',
      color: titleColor,
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
      bottom: theme.spacing.unit,
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
  titleVariant,
  titleColor,
  subtitle,
  subtitleVariant,
  buttonTitle,
  buttonComponent,
  buttonProps,
  link,
  linkTarget,
  mobile,
}) => {
  const [showLoad, setShowLoad] = useState(true);
  const [showError, setShowError] = useState(false);

  const classes = useStyle({ titleColor })();

  return (
    <div
      className={className(classes.root, {
        [classes.rootMobile]: mobile,
        [classes.cursorPointer]: !mobile && link,
      })}
      onClick={
        !mobile
          ? () => (link ? window.open(link, linkTarget) : null)
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
        src={backgroundImage}
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
            variant={titleVariant}
            className={classes.title}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Typography
            variant={subtitleVariant}
            className={classes.subtitle}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
          {!link && (
            <Button
              component={buttonComponent}
              className={classes.button}
              size="small"
              {...buttonProps}
            >
              {buttonTitle}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Slide.defaultProps = {
  title: '',
  titleVariant: 'h4',
  titleColor: 'white',
  subtitle: '',
  subtitleVariant: 'subtitle1',
  buttonTitle: 'SABER MAIS',
  buttonComponent: 'Link',
  buttonProps: {},
  link: '',
  linkTarget: 'self',
  mobile: false,
};

Slide.propTypes = {
  /**
   * Image path to display on background.
   */
  backgroundImage: PropTypes.string.isRequired,
  /**
   * Title of the slide.
   */
  title: PropTypes.string,
  /**
   * Title variant style of the slide.
   */
  titleVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * Title color style of the slide.
   */
  titleColor: PropTypes.string,
  /**
   * Subtitle of the slide.
   */
  subtitle: PropTypes.string,
  /**
   * Subtitle variant style of the slide.
   */
  subtitleVariant: PropTypes.oneOf(['subtitle1', 'subtitle2']),
  /**
   * Name to appear in the button.
   */
  buttonTitle: PropTypes.string,
  /**
   * Component for button.
   */
  buttonComponent: PropTypes.object,
  /**
   * Component props for button.
   */
  buttonProps: PropTypes.object,
  /**
   * Link to redirect when click on slide.
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
