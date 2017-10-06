import React, {Component} from 'react';

const style = {
  container: {
    display: 'flex',
  },
  cell: {
    flexGrow: 1,
    flexBasis: 0,
    lineHeight: '50px',
    minWidth: 200,
    height: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRight: '1px solid #fff',
    backgroundColor: '#00A6EF',
    color: '#fff',
  }
};

export default class ScheduleHeader extends Component{

  constructor(props){
    super(props);
    this.state = {
      dates: [],
    };
  }

  componentWillMount(){
    this.buildDates(this.props.startDate, this.props.endDate);
  }

  buildDates = (startDate, endDate) => {
    let dates = [];
    let dateString = "";
    for(let currDate = new Date(startDate); currDate < endDate; currDate.setDate(currDate.getDate() + 1)){
      dateString = currDate.getMonth() + '/' + currDate.getDay();
      dates.push(dateString);
    }
    this.setState({dates: dates});
  };

  render(){

    return (
      <div style={style.container}>
        {
          this.state.dates.map((date, index) => (
            <div key={index} style={style.cell} className="schedule-header">
              {date}
            </div>
          ))
        }
      </div>
    )
  }

}
