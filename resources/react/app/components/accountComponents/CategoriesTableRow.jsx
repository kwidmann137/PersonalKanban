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
    console.log("UPDATE COLOR");
    console.log(this.props.categoryIndex);
    this.props.updateColor(this.props.categoryIndex, color.hex);
  };

  updateName = (evt, value) => {
    this.props.updateName(this.props.categoryIndex, value);
  };

  updateHours = (evt, value) => {
    console.log(this.props.category.hours);
    let newHours = [...this.props.category.hours];
    newHours[evt.target.name] = value;
    console.log(newHours);
    this.props.updateHours(this.props.categoryIndex, newHours);
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
