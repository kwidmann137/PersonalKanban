import React from 'react';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import DeleteDialog from "./DeleteDialog";

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
    this.props.deleteNote(this.props.note.index)
  };

  render(){

    return(
      <div>
        {
          this.state.delete &&
            <DeleteDialog
              message={"Are you sure you want to delete " + this.props.note.text}
              handleCancel={this.togglePrompt}
              handleConfirm={this.deleteNote}
            />
        }
        <Paper style={this.props.style} zDepth={1}>
          <p>{this.props.note.text}</p>
          <p>{this.props.note.dueDate}</p>
          <div className="text-center hover-group" style={deleteStyle}>
            <Delete onClick={this.togglePrompt}/>
          </div>
        </Paper>
      </div>
    )
  }
};
