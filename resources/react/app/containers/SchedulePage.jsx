import ReactDOMServer from 'react-dom/server';
import Schedule from 'Components/Schedule';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: formatItems(state.items)
  }
};

export default connect(
  mapStateToProps
)(Schedule)

const formatItems = (items) => {
  let newItems = [];
  let newItem;
  items.forEach((item) => {
    newItem = {};
    newItem.start = getItemStartDate(item);
    newItem.end = new Date(item.dueDate);
    newItem.content = item.text;
    newItems.push(newItem);
  });

  console.log(newItems);

  return newItems;
};

const getItemStartDate = (item) => {
  let endDate = new Date(item.dueDate);
  let numDaysToComplete = item.estimatedTime / 2;
  endDate.setDate(endDate.getDate() - numDaysToComplete);
  return endDate;
};

const itemContent = (item) => {
  return (
    <div>
      <div style={Object.assign({}, style.mainContent, {backgroundColor: colors.mainContent[item.category]})}>{item.text}</div>
      <div style={Object.assign({}, {backgroundColor: colors.status[item.status]}, style.status)}/>
    </div>
  );
};

const getItemStyle = (item) => {
  return {
    padding: 10,
    border: '2px solid ' + colors.status[item.status]
  }
};

const colors = {
  status:{
    early: '#50B762',
    startNow: '#FCD74C',
    late: '#C62021',
  },
};
