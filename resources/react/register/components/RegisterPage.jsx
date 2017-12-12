import React from 'react'
import TopMenuBar from '../../app/core/components/TopMenuBar';
import RegisterForm from './RegisterForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class  RegisterPage extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopMenuBar/>
          <RegisterForm/>
        </div>
      </MuiThemeProvider>
    );
  }
}
