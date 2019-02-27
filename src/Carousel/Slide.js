import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function Slide({
  classes,
  imageBackground,
  imageTitle,
  title,
  subtitle,
  link,
  ...other
}) {
  return (
    <div>
      <img src={imageTitle} alt="" />
      <div>
        <Typography>{title}</Typography>
        <Typography>{subtitle}</Typography>
      </div>
    </div>
  );
}

Slide.defaultProps = {
  imageTitle: '',
  title: '',
  subtitle: '',
  link: '',
};

Slide.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Image path to display on background.
   */
  imageBackground: PropTypes.string.isRequired,
  /**
   * Image path to display along with the title
   */
  imageTitle: PropTypes.string,
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
