import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Dots from 'material-ui-dots';
import { makeStyles, useTheme } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { grey } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Carousel from './Carousel';
import { modulo } from './util';

const useStyle = makeStyles(theme => ({
  content: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  arrow: {
    width: 4 * theme.spacing(1),
    height: 4 * theme.spacing(1),
    zIndex: 1,
    top: '45%',
    position: 'absolute',
    opacity: 0.2,
    transition: 'opacity 2s',
    '&:hover': {
      opacity: 1,
    },
  },
  arrowLeft: {
    left: 2 * theme.spacing(1),
  },
  arrowRight: {
    right: 2 * theme.spacing(1),
  },
  arrowIcon: {
    color: grey[700],
  },
  carouselWrapper: {
    overflow: 'hidden',
    transform: 'scale(1.0)',
    background: 'transparent',
    height: '100%',
    width: '100%',
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselDiv: {
    width: '100%',
    height: '100%',
  },
  dots: {
    margin: '0 auto',
    top: '85%',
    left: '50%',
    position: 'absolute',
    zIndex: 1,
    transform: 'translate(-50%, -50%)',
  },
  dotsMobile: {
    paddingTop: 0,
  },
}));

export const AutoRotatingCarousel = ({
  autoplay,
  children,
  interval,
  variant,
  square,
}) => {
  const classes = useStyle();
  const hasMultipleChildren = React.Children.count(children) > 1;
  const [slideIndex, setSlideIndex] = useState(0);

  const matches = useMediaQuery(useTheme().breakpoints.down('xs'));
  // const matches = true;

  let mobile = false;

  if (variant === 'auto') {
    if (matches) {
      mobile = true;
    }
  } else if (variant === 'mobile') {
    mobile = true;
  }

  const carousel = (
    <Carousel
      autoplay={autoplay && hasMultipleChildren}
      className={classes.carousel}
      index={slideIndex}
      interval={interval}
      onChangeIndex={newIndex => setSlideIndex(newIndex)}
      slideClassName={classes.slide}
    >
      {React.Children.map(children, c =>
        React.cloneElement(c, { mobile }, null)
      )}
    </Carousel>
  );

  return (
    <div className={classes.content}>
      {hasMultipleChildren && !mobile && (
        <div>
          <Fab
            className={clsx(classes.arrow, classes.arrowLeft)}
            onClick={() => setSlideIndex(prevIndex => prevIndex - 1)}
          >
            <ArrowBackIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}
      {hasMultipleChildren && mobile && (
        <Dots
          count={children.length}
          index={modulo(slideIndex, children.length)}
          className={clsx(classes.dots, {
            [classes.dotsMobile]: mobile,
          })}
          onDotClick={slideIndexNew => setSlideIndex(slideIndexNew)}
        />
      )}

      <div className={classes.carouselDiv}>
        <Paper
          elevation={0}
          className={classes.carouselWrapper}
          square={square}
        >
          {carousel}
        </Paper>
      </div>

      {hasMultipleChildren && !mobile && (
        <div>
          <Fab
            className={clsx(classes.arrow, classes.arrowRight)}
            onClick={() => setSlideIndex(prevIndex => prevIndex + 1)}
          >
            <ArrowForwardIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      )}
    </div>
  );
};

AutoRotatingCarousel.defaultProps = {
  autoplay: false,
  interval: 5000,
  variant: 'auto',
  square: true,
};

AutoRotatingCarousel.propTypes = {
  /** If `false`, the auto play behavior is disabled. */
  autoplay: PropTypes.bool,
  /** Delay between auto play transitions (in ms). */
  interval: PropTypes.number,
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  square: PropTypes.bool,
};

export default AutoRotatingCarousel;
