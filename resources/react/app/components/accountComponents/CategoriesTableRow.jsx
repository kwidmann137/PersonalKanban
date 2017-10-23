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

  updateColor = (color) => {
    this.props.updateColor(color.hex, this.props.categoryIndex);
  };

  updateInput = (evt, value) => {
    this.props.updateName(value, this.props.categoryIndex);
  };

  updateHours = (evt, value) => {
    if(value > 0 || value === ''){
      if(value === '') value = 0;
      let newHours = [...this.props.category.hours];
      newHours[evt.target.name] = value;
      this.props.updateHours(newHours, this.props.categoryIndex);
    }
  };

  render(){
    return(
      <div style={style.row}>
        <div style={style.titleColumn}>
          <TextField
            onChange={this.updateInput}
            name="name"
            value={this.props.category.name}
            style={{width: 'auto'}}
            // errorText={this.props.errors.firstName}
          />
        </div>
        <div style={style.dayColumn}>
          <ColorPickerDropDown color={this.props.category.color} onChange={this.updateColor}/>
        </div>
        {
          this.props.category.hours.map((hours, index) => (
            <TextField
              className="center-placeholder"
              key={index}
              style={style.dayColumn}
              inputStyle={{textAlign: 'center'}}
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
