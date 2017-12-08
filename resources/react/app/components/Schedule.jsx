import React from 'react';
import Timeline from 'react-visjs-timeline';
import ReactDOMServer from 'react-dom/server';
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

const colors = {
  status:{
    early: '#50B762',
    startNow: '#FCD74C',
    late: '#C62021',
  },
};

const Schedule = ({items}) => {

  let formattedItems = formatItems(items);

  return(
    <div>
      {
        formattedItems.length < 1 &&
        <NoItemsMessage />
      }
      {
        formattedItems.length > 0 &&
        <Timeline
          items={items}
        />
      }
    </div>
  );
};

export default Schedule;

const formatItems = (items, categories) => {
  let newItems = [];
  let newItem;
  let currentDate = new Date();
  items.forEach((item) => {
    let endDate = new Date(item.due_date);
    endDate.setDate(endDate.getDate() + 1);
    newItem = {};
    newItem.start = getItemStartDate(item, endDate);
    newItem.end = endDate;
    newItem.status = getItemStatus(newItem.start, newItem.end, currentDate);
    newItem.content = getItemContent(item, newItem.status, categories);
    newItems.push(newItem);
  });

  console.log(newItems);

  return newItems;
};

const getItemStartDate = (item, endDate) => {
  let startDate = new Date(endDate);
  console.log(startDate);
  let time = item.estimated_time.split(':');
  let hours = parseInt(time[0]);
  let numDaysToComplete = Math.ceil(hours / 2);
  console.log(numDaysToComplete);
  startDate.setDate(startDate.getDate() - numDaysToComplete);
  console.log(startDate);
  return startDate;
};

const getItemContent = (item, status, categories) => {
  let color = categories.filter(category => category.id === item.category_id)[0].color;
  let itemStyle = {
    borderRadius: 10,
    padding: 10,
    backgroundColor: color + '77',
    border: '3px solid ' + colors.status[status]
  };

  return ReactDOMServer.renderToString(
    <div>
      <div style={itemStyle}>{item.description}</div>
    </div>
  );
};

const getItemStatus = (startDate, endDate, currentDate) => {
  let totalDiffMs = (endDate - startDate);
  let currentDiffMs = (endDate - currentDate);
  let percentDone = currentDiffMs / totalDiffMs;
  switch(true){
    case (percentDone < .33):
      return 'late';
    case (percentDone < .66):
      return 'startNow';
    default:
      return 'early';

  }
};

