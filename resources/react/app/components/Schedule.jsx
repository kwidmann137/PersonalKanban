import React from 'react';
import Timeline from 'react-visjs-timeline';

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
    <h1>Timeline</h1>
    <Timeline
      items={items}
    />
  </div>
);

export default Schedule;
