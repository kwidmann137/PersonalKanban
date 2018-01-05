import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import ColorPickerDropDown from './ColorPickerDropDown';
import Delete from 'material-ui/svg-icons/action/delete';
import DeleteDialog from '../dialogs/DeleteDialog';


const style = {
  row:{
    display: 'flex',
    flexWrap: 'wrap',
    borderBottom: '1px dotted #eee',
  },
  titleColumn: {
    width: '28%',
    display: 'flex'
  },
  dayColumn: {
    width: '9%',
  }
};

export default class CategoriesTableRow extends Component{

  constructor(props){
    super(props);
    this.state = {
      delete: false,
    }
  }

  togglePrompt = () => {
    this.setState({delete: !this.state.delete});
  };

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
      newHours[evt.target.name] = parseInt(value);
      this.props.updateHours(this.props.categoryIndex, newHours);
    }
  };

  render(){
    return(
      <div>
        {
          this.state.delete &&
          <DeleteDialog
            message={"Deleting the category will delete all associated items.  Are you sure you want to delete " + this.props.category.name}
            handleCancel={this.togglePrompt}
            handleConfirm={() => this.props.deleteCategory(this.props.category)}
          />
        }
        <div style={style.row}>
          <div style={style.titleColumn}>
            <div className="text-center hover-group" style={{paddingTop: 10}}>
              <Delete onClick={this.togglePrompt}/>
            </div>
            <TextField
              onChange={this.updateName}
              name="name"
              value={this.props.category.name}
              style={{width: 'auto'}}
              hintText="Work, School etc."
              errorText={this.props.errors ? this.props.errors.name : ''}
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
      </div>

    )
  }
}
