import React from 'react'
import SideMenu from 'Components/SideMenu';
import TopMenu from 'Components/TopMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActiveView from "Components/ActiveView";
import AddItem from './AddItem';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      activeView: 'account',
      addingItem: false,
    }
  }

  updateView = (view) => {
    this.setState({activeView: view});
  };

  addItem = () => this.setState({addingItem: !this.state.addingItem});

  render(){

    return (
      <MuiThemeProvider>
        <div>
          <SideMenu updateView={this.updateView}/>
          <TopMenu activeView={this.state.activeView} updateView={this.updateView} addItem={this.addItem}/>
          <ActiveView activeView={this.state.activeView}/>
          {this.state.addingItem &&
            <AddItem addItem={this.addItem}/>
          }
        </div>
      </MuiThemeProvider>
      )
  }
}
