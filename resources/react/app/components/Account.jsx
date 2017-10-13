import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import AccountInfoPane from "./accountComponents/AccountInfoPane";
import CategoryInfoPane from "./accountComponents/CategoryInfoPane";

const style = {
  default:{
    color: '#777',
    textAlign: 'center'
  },
  paper: {
    minHeight: 400,
    maxHeight: 500,
    maxWidth: 600,
    margin: ' 30px auto',
  },
  tabs: {
    backgroundColor: '#00A6EF',
  },
  inkBar:{
    backgroundColor: '#C62021',
  },
  tabContent: {
    padding: 15,
  }
};

export default class Account extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={style.default}>
        <h2>Manage Account</h2>
        <Paper style={style.paper} zDepth={3} rounded={false}>
          <Tabs inkBarStyle={style.inkBar} tabItemContainerStyle={style.tabs}>
            <Tab
              icon={<PermIdentity/>}
              label="ACCOUNT"
            >
              <AccountInfoPane style={style.tabContent}/>
            </Tab>
            <Tab
              icon={<ViewModule />}
              label="CATEGORIES"
            >
              <div style={style.tabContent}>
                <CategoryInfoPane/>
              </div>
            </Tab>
            <Tab
              icon={<SupervisorAccount />}
              label="TEAMS"
            >
              <div style={style.tabContent}>
                <h2>Teams</h2>
                <p>
                  You do not currently belong to any teams.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
