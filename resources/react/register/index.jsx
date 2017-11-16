import React from 'react';
import {render} from 'react-dom';
import RegisterPage from './components/RegisterPage'

if(document.getElementById("registerForm")){
  render(<RegisterPage/>, document.getElementById("registerForm"));
}
