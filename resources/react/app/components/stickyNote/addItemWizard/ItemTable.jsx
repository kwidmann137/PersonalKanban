import React from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Card from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveValidator from "../../../../util/validators/SaveValidator";

export default class ItemTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '400px',
      originalItem: {...props.originalItem},
      items: [...props.items]
    };

    this.saveValidator = new SaveValidator();
  }

  componentWillMount(){
    this.saveValidator.validateItemSave(this.props.originalItem);
  };

  updateItemDueDate = (evt, date, index) => {
    //ToDo: now need to validate this item, at least don't let them move date earlier
    this.setState( ({items}) => {
      items[index].due_date = date;
      items[index].dirty = true;
    }, () => {
      this.saveValidator.validateItemSave(this.state.originalItem, this.state.items);
      this.forceUpdate();
    });
  };

  updateItemTime = (evt, value, index) => {
    //ToDo: now need to validate this item, at least don't let them raise items
      if(!isNaN(value)){
        if(value === '' ) value = 0;
        const item = {...this.state.items[index]};
        const time  = item.estimated_time.split(':');

        if(evt.target.name === 'estimated_time_hours'){
          this.setState( ({items}) => {
            items[index].estimated_time = value + ":" + time[1];
            items[index].dirty = true;
          }, () => {
            this.saveValidator.validateItemSave(this.state.originalItem, this.state.items);
            this.forceUpdate();
          });
        }else if(evt.target.name === 'estimated_time_minutes'){
          this.setState( ({items}) => {
            items[index].estimated_time = time[0] + ":" + value;
            items[index].dirty = true;
          }, () => {
            this.saveValidator.validateItemSave(this.state.originalItem, this.state.items);
            this.forceUpdate();
          });
        }
      }
  };

  saveItems = () => {

    let items = this.state.items.filter(item => item.dirty === true);
    items.forEach(item => delete item.dirty);

    this.props.updateItems(items)
      .then(resp => {
        this.props.resolveConflict();
      })
      .catch(error => {
        this.console.log(error);
      });
  };

  render(){

    console.log(this.saveValidator.error);
    console.log(this.saveValidator.data);

    return(
      <Card style={cardStyle}>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            {
              this.props.categories.length === 1 &&
                <TableRow>
                  <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                    {
                      this.saveValidator.error === 'ITEMS_CONFLICT' &&
                        <div>
                          <div>
                            Item does not fit into the category before the due date.<br/>
                            The category has <strong>{`${Math.floor(this.saveValidator.data.totalCategoryTime)} hours `}</strong> before the due date<br/>
                            The category has <strong>{`${Math.floor(this.saveValidator.data.availableTime)} hours
                      ${Math.ceil((this.saveValidator.data.availableTime - Math.floor(this.saveValidator.data.availableTime)) * 60)} minutes`}</strong> available<br/>
                          </div>
                          <div>
                            You can either adjust due dates to free up time or adjust estimated time for items.
                          </div>
                        </div>
                    }
                    {
                      this.saveValidator.error !== 'ITEMS_CONFLICT' &&
                        <div>The item can fit.  Hit save below to return to the item.</div>
                    }
                  </TableHeaderColumn>
                </TableRow>
            }
            <TableRow>
              <TableHeaderColumn tooltip="Description">Description</TableHeaderColumn>
              <TableHeaderColumn tooltip="Due Date">Due Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="Estimated Time">Est. Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.items.map( (item, index) => (
              <TableRow
                key={index}
                style={{height: 'auto'}}
              >
                <TableRowColumn style={{whiteSpace: 'normal', padding: 10}}>{item.description}</TableRowColumn>
                <TableRowColumn>
                  <DatePicker
                    id={index.toString()}
                    value={new Date(item.due_date)}
                    fullWidth={true}
                    name="due_date"
                    onChange={(evt, date) => this.updateItemDueDate(evt, date, index)}
                    formatDate={(date) => date.toDateString()}
                    // errorText={this.props.errors.due_date}
                  />

                </TableRowColumn>
                <TableRowColumn>
                  <div id="time_container"
                       style={{
                         position: 'relative',
                         display: 'flex'
                       }}>
                    <TextField
                      hintText="Hours"
                      floatingLabelText="Hours"
                      name="estimated_time_hours"
                      value={parseInt(item.estimated_time.split(':')[0])}
                      onChange={(evt, value) => this.updateItemTime(evt, value, index)}
                      style={{
                        width: '50%',
                        display: 'block',
                        marginTop: 10
                      }}
                      // errorText={this.props.errors.estimated_time}
                    />
                    <TextField
                      hintText="Minutes"
                      floatingLabelText="Minutes"
                      name="estimated_time_minutes"
                      value={isNaN(parseInt(item.estimated_time.split(':')[1])) ? '' : parseInt(item.estimated_time.split(':')[1])}
                      onChange={(evt, value) => this.updateItemTime(evt, value, index)}
                      style={{
                        width: '50%',
                        display: 'block',
                        marginTop: 10
                      }}
                      errorStyle={{fontSize: 0}}
                      // errorText={this.props.errors.estimated_time}
                    />

                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
          </TableFooter>
        </Table>
        {
          this.saveValidator.error !== 'ITEMS_CONFLICT' &&
            <RaisedButton
              label='Save'
              primary={true}
              onClick={this.saveItems}
            />
        }
      </Card>
    );
  }
}


const cardStyle = {
  maxWidth: '600px',
  minWidth: '350px',
  minHeight: '400px',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0 auto',
  textAlign: 'center',
  padding: '25px'
};
