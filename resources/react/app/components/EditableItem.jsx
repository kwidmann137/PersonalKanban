import React from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const style = {
  height: 400,
  width: 400,
  position: 'absolute',
  margin: 'auto',
  padding: 15,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FAEE76',
};

export default class EditableItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      title: "",
      dueDate: new Date(),
      estimatedTime: "",
      category: "",
      subTask: false,
    }
  }

  updateInput = (evt, value) => this.setState({[evt.target.name]: value});

  updateTime = (evt, index, value) => this.setState({estimatedTime: value});

  updateCategory = (evt, index, value) => this.setState({category: value});

  //evt is always null
  updateDate = (evt, date) => this.setState({dueDate: date});

  saveItem = () => {
    let state = this.state;
    this.props.addItem(state.title, state.category, state.estimatedTime, state.dueDate);
    this.props.toggleAddItem();
  };

  render(){
    return(
      <Paper style={style} zDepth={3}>
        <TextField
          hintText="Title"
          floatingLabelText="Title"
          onChange={this.updateInput}
          name="title"
          multiLine={true}
          rows={3}
          value={this.state.title}
          fullWidth={true}
          // errorText={this.props.errors.firstName}
        />
        <DatePicker
          hintText="dueDate"
          value={this.state.dueDate}
          floatingLabelText="Due Date"
          fullWidth={true}
          onChange={this.updateDate}/>

        <SelectField
          floatingLabelText="Estimated Time"
          value={this.state.estimatedTime}
          fullWidth={true}
          onChange={this.updateTime}
        >
          <MenuItem value={1} primaryText="1 Hour" />
          <MenuItem value={2} primaryText="2 Hours" />
          <MenuItem value={3} primaryText="3 Hours" />
          <MenuItem value={4} primaryText="4 Hours" />
          <MenuItem value={5} primaryText="5 Hours" />
          <MenuItem value={6} primaryText="6 Hours" />
          <MenuItem value={7} primaryText="7 Hours" />
          <MenuItem value={8} primaryText="8 Hours" />
        </SelectField>

        <SelectField
          floatingLabelText="Category"
          value={this.state.category}
          fullWidth={true}
          onChange={this.updateCategory}
        >
          <MenuItem value={0} primaryText="Home" />
          <MenuItem value={1} primaryText="Work" />
          <MenuItem value={2} primaryText="School" />
        </SelectField>

        <div className="text-right">
          <FlatButton label="Cancel" onClick={() => this.props.toggleAddItem()}/>
          <FlatButton label="Save" primary={true} onClick={this.saveItem}/>
        </div>
      </Paper>
    )
  }

}
