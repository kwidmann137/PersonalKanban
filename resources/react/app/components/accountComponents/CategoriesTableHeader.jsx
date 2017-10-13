import React, {Component} from 'react';

const style = {
  row:{
    display: 'flex',
    borderBottom: '1px solid #ccc',
  },
  titleColumn: {
    minWidth: '30%',
  },
  dayColumn: {
    textAlign: 'center',
    flexGrow: 1
  }
};

export default class CategoriesTableHeader extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={style.row}>
        <div style={style.titleColumn}>

        </div>
        <div style={style.dayColumn}>Mon</div>
        <div style={style.dayColumn}>Tu</div>
        <div style={style.dayColumn}>Wed</div>
        <div style={style.dayColumn}>Thu</div>
        <div style={style.dayColumn}>Fri</div>
        <div style={style.dayColumn}>Sat</div>
        <div style={style.dayColumn}>Sun</div>
      </div>
    )
  }
}
