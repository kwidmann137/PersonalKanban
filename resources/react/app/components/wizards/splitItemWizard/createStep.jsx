import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Validator from "../../../../util/validators/Validator";
import SaveValidator from "../../../../util/validators/SaveValidator";
import { itemRules, itemMessages } from "../../../../util/validators/validationRules/modelRules/item";
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateStep extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      origHours: props.originalItem.estimated_time_hours,
      origMinutes: props.originalItem.estimated_time_minutes,
      itemsToCreate: props.splits,
      endDate: new Date(props.originalItem.due_date),
      lastDueDate: new Date(new Date().setHours(0,0,0,0)),
      maxTime: parseInt(props.originalItem.estimated_time_hours) + (parseInt(props.originalItem.estimated_time_minutes)/60),
      totalTime: 0,
      currItem: {
        description: "",
        due_date: new Date(),
        estimated_time: '',
        estimated_time_hours: '',
        estimated_time_minutes: '',
        category_id: props.originalItem.category_id,
        stage: 0,
        stage_index: 0,
        sorting_stage: 0,
        sorting_index: 0,
        completed: false,
        completed_date: null
      },
      items: [],
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
      }
    };

    this.validator = new Validator();
    this.saveValidator = new SaveValidator();
  }

  resetCurrItem = () => {
    this.setState( ({currItem}) => ({
      currItem: {
        ...currItem,
        description: "",
        estimated_time_hours: "",
        estimated_time_minutes: "",
      }
    }))
  };

  clearErrors = () => {
    this.setState(({errors}) => ({
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
      }
    }));
  };

  setErrors = (errors) => {
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

  updateItem = (field, value) => this.setState(({currItem}) => (
    {
      currItem: {
        ...currItem,
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

  //evt is always null
  updateDate = (evt, date) => this.updateItem('due_date', date);

  validateItem = () =>{
    const item = this.state.currItem;
    let errors = [];

    let formattedItem = {...this.state.currItem};
    formattedItem.due_date = new Date(formattedItem.due_date).toISOString().slice(0,10);
    formattedItem.estimated_time = item.estimated_time_hours + ":" + item.estimated_time_minutes;
    delete formattedItem.estimated_time_hours;
    delete formattedItem.estimated_time_minutes;

    if(item.due_date < this.state.lastDueDate){
      let error = {
        field: 'due_date',
        message: this.state.items.length === 0 ? 'Must be today or later' : 'Must be after the previously saved items due date',
      };
      errors.push(error);
      this.setErrors(errors);
    }else if(item.due_date > this.state.endDate){
      let error = {
        field: 'due_date',
        message: 'Must be before or on the original items end date',
      };
      errors.push(error);
      this.setErrors(errors);
    }

    let newTime = parseInt(item.estimated_time_hours) + (parseInt(item.estimated_time_minutes)/60);
    console.log(newTime);
    let newTotalTime = this.state.totalTime + newTime;
    console.log(newTotalTime);
    console.log(newTotalTime > this.state.maxTime)
    if(newTotalTime > this.state.maxTime){
      let error = {
        field: 'estimated_time',
        message: 'The combined time of all sub items can not exceed the original items time of ' + this.state.origHours + ' hours and ' + this.state.origMinutes + ' minutes',
      };
      errors.push(error);
      this.setErrors(errors);
    }

    if(errors.length > 0){
      this.setErrors(errors);
      return;
    }

    this.validator.validateAll(formattedItem, itemRules, itemMessages)
      .then(resp => {
        console.log(resp);
        this.clearErrors();
        this.validateSave(item);
      })
      .catch( errors => {
        console.log(errors);
        this.clearErrors();
        this.setErrors(errors);
      });
  };

  validateSave = (item) => {
    console.log("validating save");
    if(!this.saveValidator.validateItemSave(item)){
      console.log("Save Validator Failed");
      console.log(this.saveValidator.data);
    }

    let formattedItem = {...item};
    formattedItem.due_date = new Date(formattedItem.due_date).toISOString().slice(0,10);
    formattedItem.estimated_time = item.estimated_time_hours + ":" + item.estimated_time_minutes;
    delete formattedItem.estimated_time_hours;
    delete formattedItem.estimated_time_minutes;

    this.setState( ({items}) => ({
      items: [
        ...items,
        formattedItem,
      ]
    }), this.resetCurrItem());
    this.setState({lastDueDate: item.due_date});
    this.setState({totalTime: parseInt(this.state.totalTime) + parseInt(item.estimated_time_hours) + (parseInt(item.estimated_time_minutes)/60)});
  };

  saveItems = () => {

    this.props.addItems(this.state.items)
      .then(resp => {
        this.clearErrors();
        this.props.toggleAddItem()
      })
      .catch(error => {
        if( error.response && error.response.status === 400){
          this.clearErrors();
          this.setErrors(error.response.data);
        }
      });
  };

  render(){
    return(
      <div>
        {
          this.state.items.length === this.state.itemsToCreate &&
          <p>All items are created.  Click save to finish.</p>
        }
        {
          this.state.items.length !== this.state.itemsToCreate &&
            <div>
              <div style={{textAlign: 'center'}}>
                {`Creating ${this.state.items.length + 1} of ${this.state.itemsToCreate} items`}
              </div>
              <div>
                <TextField
                  hintText="Description"
                  floatingLabelText="Description"
                  onChange={this.updateInput}
                  name="description"
                  multiLine={true}
                  rowsMax={3}
                  value={this.state.currItem.description}
                  fullWidth={true}
                  errorText={this.state.errors.description}
                />
                <DatePicker
                  hintText="Due Date"
                  value={this.state.currItem.due_date}
                  floatingLabelText="Due Date"
                  fullWidth={true}
                  onChange={this.updateDate}
                  formatDate={(date) => new Date(date).toDateString()}
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
                    value={this.state.currItem.estimated_time}
                    fullWidth={true}
                    underlineShow={false}
                    inputStyle={{visibility:'hidden', zIndex: -1000}}
                    style={{position: 'absolute'}}

                  />
                  <TextField
                    hintText="Hours"
                    floatingLabelText="Hours"
                    name="estimated_time_hours"
                    value={this.state.currItem.estimated_time_hours}
                    onChange={this.updateTime}
                    style={{
                      width: '50%',
                      display: 'block',
                      marginTop: 10
                    }}
                    errorText={this.state.errors.estimated_time}
                  />
                  <TextField
                    hintText="Minutes"
                    floatingLabelText="Minutes"
                    name="estimated_time_minutes"
                    value={this.state.currItem.estimated_time_minutes}
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
              </div>
            </div>
        }
        <div className="text-right">
          <RaisedButton
            label={this.state.items.length === this.state.itemsToCreate ? "Save" : "Next"}
            primary={true}
            onClick={this.state.items.length === this.state.itemsToCreate ? this.saveItems : this.validateItem}/>
        </div>
      </div>
    );
  }

}
