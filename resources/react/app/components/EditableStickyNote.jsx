import React from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Api from '../../helpers/Api';

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

  constructor(props){
    super(props);
    this.state = {
      item: {
        description: "",
        due_date: new Date(),
        estimated_time: "",
        estimated_time_hours: "",
        estimated_time_minutes: "",
        category: "",
        category_id: "",
        index: 0,
        stage: 0,
        stage_index: 0,
        sorting_stage: 0,
        sorting_index: 0
      },
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
        category_id: "",
      }
    }
  }

  updateItem = (field, value) => this.setState(({item}) => (
    {
      item: {
        ...item,
        [field]: value
      }
    }
  ));

  updateInput = (evt, value) => this.updateItem(evt.target.name, value);

  updateTime = (evt, value) => {
    if(!isNaN(value)){
      this.updateItem(evt.target.name, value);
    }
  };

  updateCategory = (evt, index, value) => {
    this.updateItem('category', value);
    this.updateItem('category_id', this.props.categories[value].id);
  };

  //evt is always null
  updateDate = (evt, date) => this.updateItem('due_date', date);

  setErrors = (errors) => {
    this.setState(({errors}) => ({
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
        category_id: "",
      }
    }));

    errors.forEach( error => {
      this.setState(({errors}) => ({
          errors: {
            ...errors,
            [error.field]: error.message
          }
        })
      )
    })
  };

  saveItem = () => {
    let formattedItem = {...this.state.item};

    formattedItem.estimated_time = formattedItem.estimated_time_hours + ':' + formattedItem.estimated_time_minutes;
    formattedItem.due_date = new Date(formattedItem.due_date).toISOString().slice(0,10);
    delete formattedItem.estimated_time_hours;
    delete formattedItem.estimated_time_minutes;
    delete formattedItem.category;

    Api.post('/addItem', {
      item: formattedItem
    })
      .then(resp => {
        this.props.addItem(formattedItem.description, formattedItem.category_id, formattedItem.estimated_time, formattedItem.due_date);
        this.props.toggleAddItem();
      })
      .catch(error => {
        console.log(error);
        if( error.response && error.response.status === 400){
          this.setErrors(error.response.data);
        }
      });
  };

  render(){

    let backgroundColor = (this.state.item.category === "") ? '#FAEE76' : this.props.categories[this.state.item.category].color;

    return(
      <Paper style={Object.assign({}, {backgroundColor: backgroundColor}, style)} zDepth={3}>
        {
          this.props.categories.length < 1 &&
            <div>
              <h3>You do not have any categories set up.
                <br/>
                <a href="#"
                   onClick={(e) => {
                     e.preventDefault();
                     this.props.updateView('categories');
                     this.props.toggleAddItem()
                   }}>Click here</a> to add some.
              </h3>
            </div>
        }
        {
          this.props.categories.length > 0 &&
            <div>
              <TextField
                hintText="Description"
                floatingLabelText="Description"
                onChange={this.updateInput}
                name="description"
                multiLine={true}
                rows={1}
                rowsMax={3}
                value={this.state.item.description}
                fullWidth={true}
                errorText={this.state.errors.description}
              />
              <DatePicker
                hintText="dueDate"
                value={this.state.item.due_date}
                floatingLabelText="Due Date"
                fullWidth={true}
                onChange={this.updateDate}
                formatDate={formatDate}
                errorText={this.state.errors.due_date}
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
                  value={this.state.item.estimated_time}
                  fullWidth={true}
                  underlineShow={false}
                  inputStyle={{visibility:'hidden', zIndex: -1000}}
                  style={{position: 'absolute'}}

                />
                <TextField
                  hintText="Hours"
                  floatingLabelText="Hours"
                  name="estimated_time_hours"
                  value={this.state.item.estimated_time_hours}
                  onChange={this.updateTime}
                  style={{
                    width: '50%',
                    display: 'block',
                    marginTop: 10
                  }}
                  errorText={this.state.errors.estimated_time}
                  // errorText={this.state.errors.estimated_time}
                />
                <TextField
                  hintText="Minutes"
                  floatingLabelText="Minutes"
                  name="estimated_time_minutes"
                  value={this.state.item.estimated_time_minutes}
                  onChange={this.updateTime}
                  style={{
                    width: '50%',
                    display: 'block',
                    marginTop: 10
                  }}
                  errorStyle={{fontSize: 0}}
                  errorText={this.state.errors.estimated_time}
                />

              </div>

              <SelectField
                floatingLabelText="Category"
                value={this.state.item.category}
                fullWidth={true}
                onChange={this.updateCategory}
                errorText={this.state.errors.category_id}
              >
                {
                  this.props.categories.map((category, index) => (
                    <MenuItem key={index} value={index} primaryText={category.name} />
                  ))
                }
              </SelectField>

              <div className="text-right">
                <FlatButton label="Cancel" onClick={() => this.props.toggleAddItem()}/>
                <FlatButton label="Save" primary={true} onClick={this.saveItem}/>
              </div>
            </div>
        }
      </Paper>
    )
  }

}

const timeFormatter = (time) => {

};
