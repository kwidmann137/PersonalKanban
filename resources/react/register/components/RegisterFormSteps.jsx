import React from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import StepConnector from './StepConnector';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const cardStyle = {
  maxWidth: '500px',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0 auto',
  textAlign: 'center',
};

export default class RegisterFormSteps extends React.Component{

  constructor(props){
    super(props);
  }

  render() {

    const stepIndex = this.props.stepIndex;

    return (
      <div>
        {stepIndex === 0 &&
          <div>
            <TextField
              hintText="First Name"
              floatingLabelText="First Name"
              onChange={this.props.updateInput}
              name="firstName"
              value={this.props.user.firstName}
              errorText={this.props.errors.firstName}
            />
            <TextField
              hintText="Last Name"
              floatingLabelText="Last Name"
              onChange={this.props.updateInput}
              name="lastName"
              value={this.props.user.lastName}
              errorText={this.props.errors.lastName}
            />
          </div>
        }
        {stepIndex === 1 &&
        <div>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange={this.props.updateInput}
            name="email"
            value={this.props.user.email}
            errorText={this.props.errors.email}
          />
        </div>
        }
        {stepIndex === 2 &&
        <div>
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            onChange={this.props.updateInput}
            name="password"
            type="password"
            value={this.props.user.password}
            errorText={this.props.errors.password}
          />
          <TextField
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            onChange={this.props.updateInput}
            name="confirmPassword"
            type="password"
            value={this.props.user.confirmPassword}
            errorText={this.props.errors.confirmPassword}
          />
        </div>
        }
      </div>
    )
  }

}
