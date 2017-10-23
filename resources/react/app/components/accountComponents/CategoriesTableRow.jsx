import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import ColorPickerDropDown from './ColorPickerDropDown';

const style = {
  row:{
    display: 'flex',
    borderBottom: '1px dotted #eee',
  },
  titleColumn: {
    minWidth: '25%',
  },
  dayColumn: {
    flexGrow: 1
  }
};

export default class CategoriesTableRow extends Component{

  constructor(props){
    super(props);
  }

  updateColor = (color, evt) => {
      console.log(evt);
      console.log(color);
  };

  render(){
    return(
      <div style={style.row}>
        <div style={style.titleColumn}>
          {this.props.category.name}
        </div>
        <div>
          <ColorPickerDropDown color={this.props.category.color} updateColor={this.updateColor}/>
        </div>
        {
          this.props.category.hours.map((hours, index) => (
            <TextField
              key={index}
              style={style.dayColumn}
              onChange={this.props.updateInput}
              name={index.toString()}
              value={hours}
              // errorText={this.props.errors.firstName}
            />
          ))
        }
      </div>
    )
  }
}
