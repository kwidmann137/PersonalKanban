import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

const barStyle = {
  backgroundColor: '#fff',
  height: 'auto',
};

const style = {
  height: 80,
  width: 80,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export default class TopMenu extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    return (
      <Toolbar style={barStyle}>
        <ToolbarGroup>

        </ToolbarGroup>
        <ToolbarGroup>
          <Paper style={style} zDepth={1}>
            <p>All Items</p>
          </Paper>
          <Paper style={style} zDepth={1} />
          <Paper style={style} zDepth={1} />
        </ToolbarGroup>
      </Toolbar>
    )
  }

}
