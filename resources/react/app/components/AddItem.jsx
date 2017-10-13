import React from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const loader = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: '1000'
};

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

export default class AddItem extends React.Component{

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
    console.log("Saving item");
    this.props.addItem()
  };

  render(){
    return(
      <div style={loader}>
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
            <MenuItem value={1} primaryText="Work" />
            <MenuItem value={2} primaryText="School" />
            <MenuItem value={3} primaryText="Home" />
          </SelectField>

          <div className="text-right">
            <FlatButton label="Cancel" onClick={() => this.props.addItem()}/>
            <FlatButton label="Save" primary={true} onClick={this.saveItem}/>
          </div>
        </Paper>
      </div>
    )
  }

}
