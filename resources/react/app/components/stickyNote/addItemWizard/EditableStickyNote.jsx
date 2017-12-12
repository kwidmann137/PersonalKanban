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
};

const formatDate = (date) => date.toDateString();

export default class EditableStickyNote extends React.Component{

  updateInput = (evt, value) => this.props.updateItem(evt.target.name, value);

  updateTime = (evt, value) => {
    if(!isNaN(value)){
      this.props.updateItem(evt.target.name, value);
    }
  };

  updateCategory = (evt, index, value) => this.props.updateItem('category_id', value);

  //evt is always null
  updateDate = (evt, date) => this.props.updateItem('due_date', date);

  render(){

    let category = this.props.categories.filter(category => category.id === this.props.item.category_id)[0];
    let backgroundColor = typeof category === 'undefined' ? '#FAEE76' : category.color;

    return(
      <Paper style={Object.assign({}, {backgroundColor: backgroundColor}, style)} zDepth={3}>
        <TextField
          hintText="Description"
          floatingLabelText="Description"
          onChange={this.updateInput}
          name="description"
          multiLine={true}
          rows={1}
          rowsMax={3}
          value={this.props.item.description}
          fullWidth={true}
          errorText={this.props.errors.description}
        />
        <DatePicker
          hintText="dueDate"
          value={this.props.item.due_date}
          floatingLabelText="Due Date"
          fullWidth={true}
          onChange={this.updateDate}
          formatDate={formatDate}
          errorText={this.props.errors.due_date}
        />

        <div id="time_container"
        style={{
          position: 'relative',
          display: 'flex'
        }}>
          <TextField
            floatingLabelText="Estimated Time"
            floatingLabelFixed={true}
            name="estimated_time"
            value={this.props.item.estimated_time}
            fullWidth={true}
            underlineShow={false}
            inputStyle={{visibility:'hidden', zIndex: -1000}}
            style={{position: 'absolute'}}

          />
          <TextField
            hintText="Hours"
            floatingLabelText="Hours"
            name="estimated_time_hours"
            value={this.props.item.estimated_time_hours}
            onChange={this.updateTime}
            style={{
              width: '50%',
              display: 'block',
              marginTop: 10
            }}
            errorText={this.props.errors.estimated_time}
          />
          <TextField
            hintText="Minutes"
            floatingLabelText="Minutes"
            name="estimated_time_minutes"
            value={this.props.item.estimated_time_minutes}
            onChange={this.updateTime}
            style={{
              width: '50%',
              display: 'block',
              marginTop: 10
            }}
            errorStyle={{fontSize: 0}}
            errorText={this.props.errors.estimated_time}
          />

        </div>

        <SelectField
          floatingLabelText="Category"
          value={this.props.item.category_id}
          fullWidth={true}
          onChange={this.updateCategory}
          errorText={this.props.errors.category_id}
        >
          {
            this.props.categories.map((category, index) => (
              <MenuItem key={index} value={category.id} primaryText={category.name} />
            ))
          }
        </SelectField>

        <div className="text-right">
          <FlatButton label="Cancel" onClick={() => this.props.toggleAddItem()}/>
          <FlatButton label="Save" primary={true} onClick={() => this.props.saveItem()}/>
        </div>
      </Paper>
    )
  }
}
