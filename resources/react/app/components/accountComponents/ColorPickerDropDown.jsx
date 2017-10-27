import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import ColorPicker from "./ColorPicker";

const style = {
  height: 30,
  width: 30,
  margin: '10px 5px',
};

export default class ColorPickerDropDown extends Component{

  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  handleUpdate = (color) => {
    this.props.onChange(color);
    this.handleRequestClose();
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
    return (
      <div>
        <RaisedButton
          onClick={this.handleTouchTap}
          label=" "
          buttonStyle={Object.assign({}, style, {backgroundColor: this.props.color})}
          style={{minWidth: 30, boxShadow: 'none'}}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <ColorPicker onChange={this.handleUpdate}/>
        </Popover>
      </div>
    )
  }
};
