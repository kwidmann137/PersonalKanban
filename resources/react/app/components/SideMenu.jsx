import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dehaze from 'material-ui/svg-icons/image/dehaze';
import axios from 'axios';

const menuButtonStyle = {
  position: 'absolute',
  minWidth: 60,
  width: 60,
  padding: 10,
  zIndex: 99999
};

const portraitStyle = {
  height: '100px',
  width: '100px',
  margin: '30px auto',
  textAlign: 'center',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  overflow: 'hidden'
};

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  updateView = (view) => {
    this.setState({open: false});
    this.props.updateView(view);
  };

  render() {
    return (
      <div>
        <div>
          <RaisedButton
            label=""
            onClick={this.handleToggle}
            style={menuButtonStyle}
          >
            <Dehaze style={{width: 40, height: 40}}/>
          </RaisedButton>
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <Paper style={portraitStyle} zDepth={1} circle={true}>
                <img src="http://i.imgur.com/0mVGhzd.jpg" alt="Portrait" style={imageStyle}/>
            </Paper>
            <MenuItem onClick={() => this.updateView('account')}>Account</MenuItem>
            <MenuItem onClick={() => this.updateView('personalBoard')}>Personal Board</MenuItem>
            <MenuItem onClick={() => this.updateView('schedule')}>Schedule</MenuItem>
            <MenuItem onClick={() => this.updateView('sortItems')}>Sort Items</MenuItem>
            <MenuItem onClick={() => this.updateView('categories')}>Categories</MenuItem>
            <MenuItem onClick={() => window.location.href = "/logout"}>Logout</MenuItem>
          </Drawer>
        </div>
        <div>

        </div>
      </div>
    );
  }
}
