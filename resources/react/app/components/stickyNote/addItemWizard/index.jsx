import React from 'react';
import SplitItemWizard from "../splitItemWizard/index";
import EditableStickyNote from "./EditableStickyNote";
import Paper from 'material-ui/Paper';
import { itemRules, itemMessages } from "../../../../util/validators/validationRules/modelRules/item";
import Validator from '../../../../util/validators/Validator';
import SaveValidator from '../../../../util/validators/SaveValidator';
import BaseDialog from '../../core/dialogs/BaseDialog';
import ConfirmOnlyDialog from "../../core/dialogs/ConfirmOnlyDialog";
import ItemTable from '../../../containers/ItemTable';

export default class AddItemWizard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      item: {
        description: "",
        due_date: new Date(),
        estimated_time: "",
        estimated_time_hours: "",
        estimated_time_minutes: "",
        category_id: "",
        stage: 0,
        stage_index: 0,
        sorting_stage: 0,
        sorting_index: 0,
        completed: false,
        completed_date: null
      },
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
        category_id: "",
      },
      splitting: false,
      forceSplit: false,
      promptToSplit: false,
      itemsConflict:false,
      notEnoughTime: false,
    };

    this.validator = new Validator();
    this.saveValidator = new SaveValidator();
  }

  updateItem = (field, value) => this.setState(({item}) => (
    {
      item: {
        ...item,
        [field]: value
      }
    }
  ));

  clearErrors = () => {
    this.setState(({errors}) => ({
      errors: {
        description: "",
        due_date: "",
        estimated_time: "",
        category_id: "",
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

  validateItem = (item = this.state.item) => {

    const formattedItem = {...item};
    formattedItem.estimated_time = item.estimated_time_hours + ":" + item.estimated_time_minutes;
    formattedItem.due_date = new Date(item.due_date).toISOString().slice(0,10);

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
    this.setState({forceSplit: false});
    this.setState({promptToSplit: false});
    this.setState({itemsConflict: false});
    this.setState({notEnoughTime: false});
    if(!this.saveValidator.validateItemSave(item)){
      switch(this.saveValidator.error){
        case 'NEED_SPLIT':
          console.log("Setting splitting");
          this.setState({forceSplit: true});
          break;
        case 'SHOULD_SPLIT':
          console.log("Setting prompt to split");
          this.setState({promptToSplit: true});
          break;
        case 'ITEMS_CONFLICT':
          console.log("Setting can not fit");
          this.setState({itemsConflict: true});
          break;
        case 'CAN_NOT_FIT':
          console.log("Setting category time to short");
          this.setState({notEnoughTime: true});
      }
      return;
    }

    this.saveItem(item);
  };

  saveItem = (item) => {
    let formattedItem = {...item};

    formattedItem.estimated_time = formattedItem.estimated_time_hours + ':' + formattedItem.estimated_time_minutes;
    formattedItem.due_date = new Date(formattedItem.due_date).toISOString().slice(0,10);
    delete formattedItem.estimated_time_hours;
    delete formattedItem.estimated_time_minutes;

    this.props.addItem(formattedItem)
      .then(resp => {
        this.clearErrors();
        this.props.toggleAddItem();
      })
      .catch(error => {
        if( error.response && error.response.status === 400){
          this.clearErrors();
          this.setErrors(error.response.data);
        }
      });
  };

  render(){

    if(this.props.categories.length < 1){
      return (
        <Paper style={style} zDepth={3}>
          <h3>You do not have any categories set up.
            <br/>
            <a href="#"
               onClick={(e) => {
                 e.preventDefault();
                 this.props.updateView('categories');
                 this.props.toggleAddItem()
               }}>Click here</a> to add some.
          </h3>
        </Paper>
      );
    }else if(this.state.itemsConflict){
      return(
        <ItemTable
          category_id={this.state.item.category_id}
          originalItem={this.state.item}
          resolveConflict={() => this.setState({itemsConflict: false})}
        />
      )
    }else if(this.state.notEnoughTime){
      return (
        <ConfirmOnlyDialog
          title="Not enough time."
          message={"You said this item should take "
            + this.state.item.estimated_time_hours + " hours and "
            + this.state.item.estimated_time_minutes + " minutes to complete."
            + "  But the category only has " + Math.floor(this.saveValidator.data.availableCategoryTime)
            + " hours before the due date.  Please move your due date back or add time to the category"
          }
          confirmText="OK"
          handleConfirm={() => {
            this.setState({notEnoughTime: false});
          }}
        />
      )
    }else if(this.state.promptToSplit){
      return (
        <BaseDialog
          title="It looks like you should split this item."
          message={"You said this item should take "
            + this.state.item.estimated_time_hours + " hours and "
            + this.state.item.estimated_time_minutes + " minutes to complete."
            + "  But your average available time in this category before the due date "
            + " is only " + Math.floor(this.saveValidator.data.avgCategoryTime) + " hours "
            + " and " + Math.floor((this.saveValidator.data.avgCategoryTime - Math.floor(this.saveValidator.data.avgCategoryTime))*60)
            + " minutes.  Would you like to split this into smaller tasks? We will help you do so."
          }
          cancelText="No"
          handleCancel={() => this.saveItem(this.state.item)}
          confirmText="Yes! Split it up."
          handleConfirm={() => {
            this.setState({recommendSplit: false});
            this.setState({splitting: true});
          }}
        />
      )
    }else if(this.state.forceSplit){
      return (
        <ConfirmOnlyDialog
          title="You need to split this up."
          message={"You said this item should take "
            + this.state.item.estimated_time_hours + " hours and "
            + this.state.item.estimated_time_minutes + " minutes to complete."
            + "  But the most time you spend on this category during this "
            + " span is only " + Math.floor(this.saveValidator.data.maxCategoryTime) + " hours."
            + "  We will guide you through splitting the item up."
          }
          confirmText="Let's go"
          handleConfirm={() => {
            this.setState({forceSplit: false});
            this.setState({splitting: true});
          }}
        />
      )
    }else if(this.state.splitting){
      return (
        <SplitItemWizard
          originalItem={this.state.item}
          splitData={this.saveValidator.data}
          toggleAddItem={this.props.toggleAddItem}
          addItems={this.props.addItems}
        />
      );
    }else{
      return (
        <EditableStickyNote
          item={this.state.item}
          updateItem={this.updateItem}
          errors={this.state.errors}
          categories={this.props.categories}
          saveItem={this.validateItem}
          toggleAddItem={this.props.toggleAddItem}
        />
      );
    }
  };
}

const style = {
  height: 400,
  width: 400,
  position: 'absolute',
  margin: 'auto',
  padding: 15,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FAEE76'
};
