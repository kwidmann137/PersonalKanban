import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Schedule from 'Components/Schedule';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: formatItems(state.items, state.categories)
  }
};

export default connect(
  mapStateToProps
)(Schedule)

const formatItems = (items, categories) => {
  let newItems = [];
  let newItem;
  let currentDate = new Date();
  items.forEach((item) => {
    let endDate = new Date(item.dueDate);
    endDate.setDate(endDate.getDate() + 1);
    newItem = {};
    newItem.start = getItemStartDate(item, endDate);
    newItem.end = endDate;
    newItem.status = getItemStatus(newItem.start, newItem.end, currentDate);
    newItem.content = getItemContent(item, newItem.status, categories);
    newItems.push(newItem);
  });

  return newItems;
};

const getItemStartDate = (item, endDate) => {
  let startDate = new Date(endDate);
  let numDaysToComplete = Math.ceil(item.estimatedTime / 2);
  startDate.setDate(startDate.getDate() - numDaysToComplete);
  return startDate;
};

const getItemContent = (item, status, categories) => {
  let itemStyle = {
    borderRadius: 10,
    padding: 10,
    backgroundColor: categories[item.category].color + '77',
    border: '3px solid ' + colors.status[status]
  };

  return ReactDOMServer.renderToString(
    <div>
      <div style={itemStyle}>{item.text}</div>
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

const colors = {
  status:{
    early: '#50B762',
    startNow: '#FCD74C',
    late: '#C62021',
  },
};
