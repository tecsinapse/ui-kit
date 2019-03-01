import React from 'react';
import { storiesOf } from '@storybook/react';
import Slide from './Slide';
import AutoRotatingCaorusel from './AutoRotatingCarousel';

storiesOf(`Carousel`, module)
  .add('carousel single', () => (
    <AutoRotatingCaorusel>
      <Slide
        titleImage="https://conservationnation.org/img/logos/cn-elephant-orange.png"
        title="Title Example"
        subtitle="Subtitle example"
        backgroundImage="http://www.gkndriveline.com/contentassets/bcb5f78ba1cc4a21aac5be368c008f08/gkn-driveline-adapts-motorsports-technology-for-worlds-quickest-most-powerful-suv-min.jpg/"
      />
    </AutoRotatingCaorusel>
  ))
  .add('carousel multiple', () => (
    <AutoRotatingCaorusel>
      <Slide
        titleImage="https://conservationnation.org/img/logos/cn-elephant-orange.png"
        title="Title Example"
        subtitle="Subtitle example"
        backgroundImage="http://www.gkndriveline.com/contentassets/bcb5f78ba1cc4a21aac5be368c008f08/gkn-driveline-adapts-motorsports-technology-for-worlds-quickest-most-powerful-suv-min.jpg/"
      />

      <Slide
        titleImage="https://conservationnation.org/img/logos/cn-elephant-orange.png"
        title="Title Example"
        subtitle="Subtitle example"
        backgroundImage="http://i.imgur.com/nif7ztU.jpg"
      />
    </AutoRotatingCaorusel>
  ));
