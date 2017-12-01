import React from 'react';
import LoadingIndicator from '../../common/components/LoadingIndicator';
import TextField from 'material-ui/TextField';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

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

  updateUser = (evt, value) => {
    let user = {...this.state.user};
    user[evt.target.name] = value;
    this.setState({user: user});
  };

  login = () => {
    let user = this.state.user;
    axios.post('/login', user)
      .then(() => {
        window.location.href = '/app';
      })
      .catch(error => {
        console.log(error);
      })
  };

  render(){
    return (
      <div>
        {
          this.state.loading &&
          <LoadingIndicator/>
        }
        <Card style={cardStyle}>
          <CardHeader
            textStyle={{paddingRight: 0}}
            title="Login"
          />
          {
            this.state.error &&
              <small style={{color: 'red'}}>{this.state.error}</small>
          }
          {/*<form method="post" action="/login" name="login">*/}
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              name="email"
              onChange={this.updateUser}
            />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              name="password"
              type="password"
              onChange={this.updateUser}
            />

            <div style={{marginTop: 24, marginBottom: 12}}>
              <RaisedButton
                label="Login"
                primary={true}
                onClick={this.login}
                name="login"
                // type="submit"
              />
            </div>
          {/*</form>*/}
        </Card>
      </div>
    )
  }
}
