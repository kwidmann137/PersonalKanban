import React, {Component} from 'react';

const style = {
  row:{
    display: 'flex',
    borderBottom: '1px solid #ccc',
  },
  titleColumn: {
    minWidth: '25%',
  },
  dayColumn: {
    flexGrow: 1,
    textAlign: 'center'
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
        <div style={style.dayColumn}>Color</div>
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
