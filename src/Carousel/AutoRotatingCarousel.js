import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { grey } from '@material-ui/core/colors';
import Carousel from './Carousel';

const useStyle = makeStyles({
  root: {
    '& > *:focus': {
      outline: 'none',
    },
  },
  content: {
    width: '500px',
    height: '500px',
    border: '5px solid blue',
    position: 'relative',
    display: 'flex',
  },
  contentMobile: {
    width: '100%',
    height: '100%',
    maxWidth: 'initial',
    maxHeight: 'initial',
    margin: 0,
    top: 0,
    transform: 'none',

    '& > $carouselWrapper': {
      borderRadius: 0,
    },
  },
  arrow: {
    width: 48,
    height: 48,
    zIndex: 1,
    top: '50%',
    position: 'absolute',
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 15,
  },
  arrowIcon: {
    color: grey[700],
  },
  carouselWrapper: {
    overflow: 'hidden',
    borderRadius: 14,
    transform: 'scale(1.0)',
    background: 'transparent',
    height: '100%',
    width: '100%',
  },
  dots: {
    paddingTop: 36,
    margin: '0 auto',
  },
  dotsMobile: {
    paddingTop: 0,
  },
  dotsMobileLandscape: {
    paddingTop: 20,
  },
  footer: {
    marginTop: -72,
    width: '100%',
    position: 'relative',
    textAlign: 'center',
  },
  footerMobile: {
    marginTop: -92,
  },
  footerMobileLandscape: {
    marginTop: -3,
    transform: 'translateY(-50vh)',
    display: 'inline-block',
    width: 'auto',
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  slideMobile: {
    width: '100%',
    height: '100%',
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    height: '100%',
  },
  closed: {},
  bla: {
    width: '100%',
    zIndex: -1,
  },
});

export const AutoRotatingCarousel = ({ autoplay, children, interval }) => {
  const classes = useStyle();
  const hasMultipleChildren = children.length != null;

  const carousel = (
    <Carousel
      autoplay={autoplay && hasMultipleChildren}
      className={classes.carousel /* TODO */}
      index={null /* TODO */}
      interval={interval}
      onChangeIndex={null /* TODO */}
      slideClassName={classes.slide /* TODO */}
    >
      {React.Children.map(children, c => React.cloneElement(c))}
    </Carousel>
  );

  return (
    <div className={classes.content}>
      {hasMultipleChildren && (
        <div className={classNames(classes.arrow, classes.arrowLeft)}>
          <Fab>
            <ArrowBackIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}

      <div className={classes.bla}>
        <Paper elevation={0} className={classes.carouselWrapper /* TODO */}>
          {carousel}
        </Paper>
      </div>

      {hasMultipleChildren && (
        <div className={classNames(classes.arrow, classes.arrowRight)}>
          <Fab>
            <ArrowForwardIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}
    </div>
  );
};

AutoRotatingCarousel.defaultProps = {
  autoplay: false,
  interval: 30000,
};

AutoRotatingCarousel.propTypes = {
  /** If `false`, the auto play behavior is disabled. */
  autoplay: PropTypes.bool,
  /** Delay between auto play transitions (in ms). */
  interval: PropTypes.number,
};

export default AutoRotatingCarousel;
