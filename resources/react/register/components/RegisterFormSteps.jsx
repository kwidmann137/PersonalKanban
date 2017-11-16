import React from 'react';
import TextField from 'material-ui/TextField';

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
          <div name="step1">
            <TextField
              hintText="First Name"
              floatingLabelText="First Name"
              onChange={this.props.updateInput}
              name="first_name"
              value={this.props.user.first_name}
              errorText={this.props.errors.first_name}
            />
            <TextField
              hintText="Last Name"
              floatingLabelText="Last Name"
              onChange={this.props.updateInput}
              name="last_name"
              value={this.props.user.last_name}
              errorText={this.props.errors.last_name}
            />
          </div>
        }
        {stepIndex === 1 &&
        <div name="step2">
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
        <div name="step3">
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
            name="confirm_password"
            type="password"
            value={this.props.user.confirm_password}
            errorText={this.props.errors.confirm_password}
          />
        </div>
        }
      </div>
    )
  }

}
