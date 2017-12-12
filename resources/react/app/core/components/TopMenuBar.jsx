import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const barStyle = {
  backgroundColor: '#fff',
  boxShadow: '2px 2px 6px #eee',
};

const logoStyle = {
  maxHeight: '50px',
};

export default class TopMenuBar extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    return (
      <Toolbar style={barStyle}>
        <ToolbarGroup>
          <a href="/">
            <img src="/assets/favicon.png" alt="logo" style={logoStyle}/>
          </a>
        </ToolbarGroup>
        <ToolbarGroup>
          <a href="/login">
            <FlatButton label="Login" />
          </a>
          <a href="/register">
            <FlatButton label="Register" />
          </a>
        </ToolbarGroup>
      </Toolbar>
    )
  }

}
