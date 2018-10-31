import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/buttons.js');
  require('../stories/notifications.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
