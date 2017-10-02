import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const menuButtonStyle = {
  position: 'absolute'
};

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <div>
          <RaisedButton
            label="Menu"
            onClick={this.handleToggle}
            style={menuButtonStyle}
          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onClick={this.handleClose}>Account</MenuItem>
            <MenuItem onClick={this.handleClose}>Personal Board</MenuItem>
            <MenuItem onClick={this.handleClose}>Schedule</MenuItem>
            <MenuItem onClick={this.handleClose}>All Items</MenuItem>
            <MenuItem onClick={this.handleClose}>Categories</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Drawer>
        </div>
        <div>

        </div>
      </div>
    );
  }
}
