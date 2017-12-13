import React from 'react';
import Timeline from 'react-visjs-timeline';
import ReactDOMServer from 'react-dom/server';
import NoItemsMessage from './NoItemsMessage';
import {setEarliestPossibleStartDate} from "../../util/ItemHelpers";

const options = {
  minHeight: '300px',
};

const styles = {
  doneIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20
  }
};

const colors = {
  status:{
    early: '#50B762',
    startNow: '#FCD74C',
    late: '#C62021',
  },
};

const Schedule = ({items, categories}) => {

  let formattedItems = formatItems(items, categories);

  //ToDo: Loading indicator

  return(
    <div>
      {
        formattedItems.length < 1 &&
        <NoItemsMessage />
      }
      {
        formattedItems.length > 0 &&
        <Timeline
          items={formattedItems}
          options={options}
        />
      }
    </div>
  );
};

export default Schedule;

const formatItems = (items, categories) => {

  let formattedItems = setEarliestPossibleStartDate(items);
  console.log(items);

  let newItems = [];
  let newItem;
  formattedItems.forEach((item) => {
    console.log(item);
    newItem = {};
    newItem.start = item.start;
    newItem.end = item.end;
    newItem.content = getItemContent(item, categories);
    newItem.title = item.description;
    newItems.push(newItem);
    console.log(newItems);
  });

  console.log(newItems);

  return newItems;
};

const getItemStartDate = (item, endDate) => {
  let startDate = new Date(endDate);
  let time = item.estimated_time.split(':');
  let hours = parseInt(time[0]);
  let numDaysToComplete = Math.ceil(hours / 2);
  startDate.setDate(startDate.getDate() - numDaysToComplete);

  return startDate;
};

const getItemContent = (item, categories) => {
  let color = categories.filter(category => category.id === item.category_id)[0].color;

  let itemStyle = {
    borderRadius: 10,
    padding: 10,
    backgroundColor: color + '77',
    // border: item.completed ? 'none' : '3px solid ' + colors.status[status]
  };

  return ReactDOMServer.renderToString(
    <div>
      <div style={itemStyle}>
        {
          item.completed &&
            <img src="/assets/CheckMark.png" alt="Done Check Mark" style={styles.doneIcon}/>
        }
        {item.description}
      </div>
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

