import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Carousel from './Carousel';

export const AutoRotatingCarousel = ({
  autoplay,
  children,
  classes,
  interval,
}) => {
  const hasMultipleChildren = children.length != null;

  const carousel = (
    <Carousel
      autoplay={autoplay && hasMultipleChildren}
      className={null /* TODO */}
      index={null /* TODO */}
      interval={interval}
      onChangeIndex={null /* TODO */}
      slideClassName={null /* TODO */}
    >
      {React.Children.map(children, c => React.cloneElement(c))}
    </Carousel>
  );

  return (
    <Paper>
      elevation={1}
      className={null /* TODO */}
      {carousel}
    </Paper>
  );
};

AutoRotatingCarousel.defaultProps = {
  autoplay: false,
  interval: 30000,
};

AutoRotatingCarousel.propTypes = {
  /** If `false`, the auto play behavior is disabled. */
  autoplay: PropTypes.bool,
  /** Object for customizing the CSS classes. */
  classes: PropTypes.object.isRequired,
  /** Delay between auto play transitions (in ms). */
  interval: PropTypes.number,
};
