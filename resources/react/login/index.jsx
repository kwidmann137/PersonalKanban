import React from 'react';
import {render} from 'react-dom';
import LoginPage from './components/LoginPage'

if(document.getElementById("loginForm")){
  render(<LoginPage/>, document.getElementById("loginForm"));
}

