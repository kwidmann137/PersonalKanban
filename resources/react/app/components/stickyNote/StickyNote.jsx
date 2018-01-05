import React from 'react';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import DeleteDialog from "../dialogs/DeleteDialog";

const deleteStyle = {
  position: 'absolute',
  width: '100%',
  left: 0,
  bottom: 0
};

export default class StickyNote extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      delete: false,
    }
  }

  togglePrompt = () => {
    this.setState({delete: !this.state.delete});
  };

  deleteNote = () => {
    this.props.deleteItem(this.props.note)
      .then(resp => {
      }).catch(error => {
        //ToDo: Raise alert, failed to delete item;
      });
  };

  render(){

    return(
      <div>
        {
          this.state.delete &&
            <DeleteDialog
              message={"Are you sure you want to delete \"" + this.props.note.description + "\""}
              handleCancel={this.togglePrompt}
              handleConfirm={this.deleteNote}
            />
        }
        <Paper style={this.props.style} zDepth={1}>
          <p>{this.props.note.description}</p>
          <p>{new Date(new Date(this.props.note.due_date).getTime() + new Date().getTimezoneOffset() * 60 * 1000).toDateString()}</p>
          <div className="text-center hover-group" style={deleteStyle}>
            <Delete onClick={this.togglePrompt}/>
          </div>
        </Paper>
      </div>
    )
  }
};
