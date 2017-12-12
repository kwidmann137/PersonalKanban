import React from 'react'
import TopMenuBar from '../../app/core/components/TopMenuBar';
import LoginForm from './LoginForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LoginPage extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopMenuBar/>
          <LoginForm/>
        </div>
      </MuiThemeProvider>
    );
  }
}
