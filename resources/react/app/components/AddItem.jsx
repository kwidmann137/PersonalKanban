import React from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
  textAlign: 'center',
  position: 'absolute',
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

  updateInput = (evt, value) => {
    let newState = this.state;
    newState.user[evt.target.name] = value;
    this.setState(newState);
  };

  updateSelect = (target, evt, index, value) => {
    let self = this;
    let newState = this.state;
    newState[target] = index;
    console.log(target);
    console.log(this.state[target]);
    console.log(newState);
    this.setState(newState, function(){
      console.log(self.state);
    });
  };

  //evt is always null
  updateDate = (evt, date) => this.setState({dueDate: date});

  render(){
    return(
      <div style={loader}>
        <Paper style={style} zDepth={3}>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            onChange={() => this.updateInput()}
            name="title"
            value={this.state.title}
            // errorText={this.props.errors.firstName}
          />
          <DatePicker hintText="dueDate" value={this.state.dueDate} onChange={this.updateDate}/>

          <SelectField
            floatingLabelText="Estimated Time"
            value={this.state.estimatedTime}
            onChange={() => this.updateSelect('estimatedTime')}
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
        </Paper>
      </div>
    )
  }

}
