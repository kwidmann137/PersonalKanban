import React from 'react';
import LoadingIndicator from '../../common/components/LoadingIndicator';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const cardStyle = {
  maxWidth: '500px',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0 auto',
  padding: 20,
  textAlign: 'center',
};

export default class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      error: '',
      loading: false,
    }
  };

  updateInput = (evt, value) => {
    let { user } = this.state;
    user[evt.target.name] = value;
    this.setState({user: user});
  };

  render(){
    return (
      <div>
        {
          this.state.loading &&
          <LoadingIndicator/>
        }
        <Card style={cardStyle}>
          <h1>Login</h1>
          {
            this.state.error &&
              <small style={{color: 'red'}}>{this.state.error}</small>
          }
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange={this.updateInput}
            name="first_name"
            value={this.state.user.email}
          />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            onChange={this.updateInput}
            name="last_name"
            type="password"
            value={this.state.user.password}
          />

          <div style={{marginTop: 24, marginBottom: 12}}>
            <RaisedButton
              label="Login"
              primary={true}
              onClick={this.login}
              name="login"
            />
          </div>

        </Card>
      </div>
    )
  }
}
