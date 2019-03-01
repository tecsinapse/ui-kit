import React from 'react';
import { storiesOf } from '@storybook/react';
import Slide from './Slide';
import AutoRotatingCaorusel from './AutoRotatingCarousel';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.FORMS}|Carousel`, module).add('carousel', () => (
  <AutoRotatingCaorusel>
    <Slide
      titleImage="https://conservationnation.org/img/logos/cn-elephant-orange.png"
      title="Title Example"
      subtitle="Subtitle example"
      backgroundImage="http://www.gkndriveline.com/contentassets/bcb5f78ba1cc4a21aac5be368c008f08/gkn-driveline-adapts-motorsports-technology-for-worlds-quickest-most-powerful-suv-min.jpg/"
    />
    <Slide backgroundImage="https://cdn.theatlantic.com/assets/media/img/mt/2018/03/RTX3MUMK/square.jpg?1522767812" />
  </AutoRotatingCaorusel>
));
