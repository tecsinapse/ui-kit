import React from 'react';
import autoPlay from 'react-swipeable-views-utils/lib/autoPlay';
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard';
import SwipeableViews from 'react-swipeable-views';
import { modulo } from '../utils/util';

const VirtualizeSwipeViews = bindKeyboard(virtualize(SwipeableViews));
const VirtualizeAutoPlaySwipeViews = autoPlay(VirtualizeSwipeViews);

const style = { backgroundColor: 'black', height: '100%' };
const slideStyle = { height: '100%' };
const containerStyle = { height: '100%' };
const style1 = { backgroundColor: 'black', height: '100%' };
const slideStyle1 = { height: '100%' };
const containerStyle1 = { height: '100%' };

const carouselSlideRenderer = children => ({ index, key }) =>
  React.cloneElement(children[modulo(index, children.length)], { key });

export default function Carousel({ children, autoplay, ...other }) {
  const slideRenderer = carouselSlideRenderer(children);

  return autoplay ? (
    <VirtualizeAutoPlaySwipeViews
      {...other}
      slideRenderer={slideRenderer}
      style={style}
      slideStyle={slideStyle}
      containerStyle={containerStyle}
    />
  ) : (
    <VirtualizeSwipeViews
      {...other}
      slideRenderer={slideRenderer}
      style={style1}
      slideStyle={slideStyle1}
      containerStyle={containerStyle1}
    />
  );
}
