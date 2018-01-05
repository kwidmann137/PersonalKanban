import React from 'react'
import SideMenu from './menus/SideMenu';
import TopMenu from './menus/TopMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddItem from '../components/wizards/addItemWizard';
import LoadingIndicator from '../core/components/LoadingIndicator';
import ActiveView from '../containers/ActiveView';
import Alerts from '../containers/Alerts';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      activeView: 'personalBoard',
      addingItem: false,
    }
  }

  //ToDo: Use component will mount lifecycle hook to load initial state via API
  componentDidMount(){
    // window.onbeforeunload = this.handleAppExit;
  }

  handleAppExit = () => {
    return "Are you sure you want to leave?";
  };

  updateView = (view) => {this.setState({activeView: view})};

  toggleAddItem = () => this.setState({addingItem: !this.state.addingItem});

  render(){

    return (
      <MuiThemeProvider>
        <div>

          {
            this.state.loading &&
              <LoadingIndicator/>
          }

          <SideMenu updateView={this.updateView}/>
          <TopMenu activeView={this.state.activeView} updateView={this.updateView} toggleAddItem={this.toggleAddItem}/>

          <Alerts updateView={this.updateView}/>

          <ActiveView view={this.state.activeView}/>

          {this.state.addingItem &&
            <AddItem toggleAddItem={this.toggleAddItem} updateView={this.updateView}/>
          }
        </div>
      </MuiThemeProvider>
      )
  }
}
