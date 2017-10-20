import React from 'react'
import SideMenu from 'Components/SideMenu';
import TopMenu from 'Components/TopMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActiveView from "Containers/ActiveView";
import AddItem from 'Containers/AddItem';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      activeView: 'personalBoard',
      addingItem: false,
    }
  }

  updateView = (view) => {
    this.setState({activeView: view});
  };

  toggleAddItem = () => this.setState({addingItem: !this.state.addingItem});

  render(){

    return (
      <MuiThemeProvider>
        <div>
          <SideMenu updateView={this.updateView}/>
          <TopMenu activeView={this.state.activeView} updateView={this.updateView} toggleAddItem={this.toggleAddItem}/>
          <ActiveView activeView={this.state.activeView}/>
          {this.state.addingItem &&
            <AddItem toggleAddItem={this.toggleAddItem}/>
          }
        </div>
      </MuiThemeProvider>
      )
  }
}
