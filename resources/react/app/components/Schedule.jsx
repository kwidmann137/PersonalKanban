import React from 'react';
import ScheduleHeader from "Components/scheduleComponents/ScheduleHeader";

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

  render(){
    return(
      <div>
        <ScheduleHeader startDate={exampleItems.startDate} endDate={exampleItems.endDate}/>
      </div>
    );
  }
}

const timePerCategory = {
  home: '3',
  work: '8',
  school: '6',
};

//Note: Temporary limit to 2 hour blocks of work if possible

const exampleItems = {
  startDate: new Date(2017, 10, 5),
  endDate: new Date(2017, 10, 12),
  items: [
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 9),
      category: 'home',
      estimatedTime: '4',
    },
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 7),
      category: 'school',
      estimatedTime: '1',
    },
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 8),
      category: 'school',
      estimatedTime: '6',
    },
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 9),
      category: 'work',
      estimatedTime: '2',
    },
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 12),
      category: 'home',
      estimatedTime: '8',
    },
    {
      startDate: '',
      text: 'Example',
      dueDate: new Date(2017, 10, 12),
      category: 'work',
      estimatedTime: '5',
    },
  ]
};
