import React, {Component} from 'react';

const style = {
  row:{
    display: 'flex',
    borderBottom: '1px dotted #eee',
  },
  titleColumn: {
    minWidth: '30%',
  },
  dayColumn: {
    textAlign: 'center',
    flexGrow: 1
  }
};

export default class CategoriesTableRow extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={style.row}>
        <div style={style.titleColumn}>
          {this.props.category}
        </div>
        {
          this.props.hours.map((hours, index) => (
            <div key={index} style={style.dayColumn}>
              {hours}
            </div>
          ))
        }
      </div>
    )
  }
}
