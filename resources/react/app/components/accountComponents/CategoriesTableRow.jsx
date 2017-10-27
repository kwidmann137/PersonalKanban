import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import ColorPickerDropDown from './ColorPickerDropDown';

const style = {
  row:{
    display: 'flex',
    flexWrap: 'wrap',
    borderBottom: '1px dotted #eee',
  },
  titleColumn: {
    width: '28%',
  },
  dayColumn: {
    width: '9%',
  }
};

export default class CategoriesTableRow extends Component{

  constructor(props){
    super(props);
  }

  updateColor = (color) => {
    this.props.updateColor(this.props.categoryIndex, color.hex);
  };

  updateName = (evt, value) => {
    this.props.updateName(this.props.categoryIndex, value);
  };

  updateHours = (evt, value) => {
    if(value >= 0 || value === '') {
      if(value === '' ) value = 0;
      let newHours = [...this.props.category.hours];
      newHours[evt.target.name] = value;
      this.props.updateHours(this.props.categoryIndex, newHours);
    }
  };

  render(){
    return(
      <div style={style.row}>
        <div style={style.titleColumn}>
          <TextField
            onChange={this.updateName}
            name="name"
            value={this.props.category.name}
            style={{width: 'auto'}}
            hintText="Work, School etc."
            // errorText={this.props.errors.firstName}
          />
        </div>
        <div style={style.dayColumn}>
          <ColorPickerDropDown color={this.props.category.color} onChange={this.updateColor}/>
        </div>
        {
          this.props.category.hours.map((hours, index) => (
            <TextField
              key={index}
              style={style.dayColumn}
              onChange={this.updateHours}
              name={index.toString()}
              hintText="0"
              value={(hours === 0 ? '' : hours)}
              // errorText={this.props.errors.firstName}
            />
          ))
        }
      </div>
    )
  }
}
