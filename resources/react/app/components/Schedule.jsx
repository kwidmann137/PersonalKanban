import React from 'react';
import Timeline from 'react-visjs-timeline';
import NoItemsMessage from './NoItemsMessage';

const options = {
  width: '100%',
  minHeight: '200px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
};

const Schedule = ({items}) => (
  <div>
    {
      items.length < 1 &&
      <NoItemsMessage />
    }
    {
      items.length > 0 &&
      <Timeline
        items={items}
      />
    }
  </div>
);

export default Schedule;
