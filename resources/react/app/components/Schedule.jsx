import React from 'react';
import ScheduleHeader from "Components/scheduleComponents/ScheduleHeader";
import Timeline from 'react-visjs-timeline';
import ReactDOMServer from 'react-dom/server';

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

const style = {
  item:{
    padding: 0,
  },
  mainContent:{
    padding: 10,
  },
  status:{
    padding: 0,
    height: '10px',
  }
};

const colors = {
  mainContent:{
    home: '#FAEE76',
    work: '#FD892C',
    school: '#86CBFB',
  },
  status:{
    early: '#50B762',
    startNow: '#FCD74C',
    late: '#C62021',
  },
};

export default class Schedule extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      colors: {
        home: '#FAEE76',
        work: '#FD892C',
        school: '#86CBFB',
      }
    }
  }

  componentWillMount(){
    for(let item in exampleItems){
      if(exampleItems.hasOwnProperty(item)){
        let content = itemContent(exampleItems[item]);
        console.log(content);
        exampleItems[item].content = content;
      }
    }
    console.log(exampleItems);
  }

  render(){
    return(
      <div>
        <h1>Timeline</h1>
        <Timeline
          items={exampleItems}
        />
      </div>
    );
  }
}

const itemContent = (item) => {
  return (
    ReactDOMServer.renderToString(
      <div>
        <div style={Object.assign({}, style.mainContent, {backgroundColor: colors.mainContent[item.category]})}>{item.text}</div>
        <div style={Object.assign({}, {backgroundColor: colors.status[item.status]}, style.status)}/>
      </div>
    )
  );
};

const exampleItems = [
    {
      start: new Date(2017, 10, 6),
      text: 'Example home item',
      end: new Date(2017, 10, 9),
      category: 'home',
      estimatedTime: '4',
      status: 'early',
    },
    {
      start: new Date(2017, 10, 6),
      text: 'Example school item',
      end: new Date(2017, 10, 7),
      category: 'school',
      estimatedTime: '1',
      status: 'startNow',
    },
    {
      start: new Date(2017, 10, 6),
      text: 'Example school item 2',
      end: new Date(2017, 10, 8),
      category: 'school',
      estimatedTime: '6',
      status: 'early',
    },
    {
      start: new Date(2017, 10, 7),
      text: 'Example work item',
      end: new Date(2017, 10, 9),
      category: 'work',
      estimatedTime: '2',
      status: 'late',
    },
    {
      start: new Date(2017, 10, 6),
      text: 'Example home item 2',
      end: new Date(2017, 10, 12),
      category: 'home',
      estimatedTime: '8',
      status: 'late',
    },
    {
      start: new Date(2017, 10, 12),
      text: 'Example work item 2',
      end: new Date(2017, 10, 12),
      category: 'work',
      estimatedTime: '5',
      status: 'startNow',
    },
  ];
//Note: Temporary limit to 2 hour blocks of work if possible

// const exampleItems = {
//   startDate: new Date(2017, 10, 5),
//   endDate: new Date(2017, 10, 12),
//   items: [
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 9),
//       category: 'home',
//       estimatedTime: '4',
//     },
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 7),
//       category: 'school',
//       estimatedTime: '1',
//     },
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 8),
//       category: 'school',
//       estimatedTime: '6',
//     },
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 9),
//       category: 'work',
//       estimatedTime: '2',
//     },
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 12),
//       category: 'home',
//       estimatedTime: '8',
//     },
//     {
//       startDate: '',
//       text: 'Example',
//       dueDate: new Date(2017, 10, 12),
//       category: 'work',
//       estimatedTime: '5',
//     },
//   ]
// };
