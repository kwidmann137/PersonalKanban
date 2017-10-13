import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
   portraitStyle: {
    height: '200px',
    width: '200px',
    margin: '30px auto',
    textAlign: 'center',
    overflow: 'hidden'
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    overflow: 'hidden'
  },
};

export default class AccountInfoPane extends Component{

  constructor(props){
    super(props);
    this.state = {
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  updateInput = (evt, value) => {
    let newState = this.state;
    newState.user[evt.target.name] = value;
    this.setState(newState);
  };

  changePassword = () => {
    console.log("Triggered changing password");
  };

  changeAvatar = () => {
    console.log("Triggered changing avatar");
  };

  render(){
    return(
      <div style={this.props.style} className="row">
        <h2 className="col-12">Account Info</h2>
        <div className="col-12 col-md-6">
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            onChange={() => this.updateInput()}
            name="firstName"
            value={this.state.firstName}
            // errorText={this.props.errors.firstName}
          />
          <br/>
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            onChange={() => this.updateInput()}
            name="lastName"
            value={this.state.lastName}
            // errorText={this.props.errors.firstName}
          />
          <br/>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange={() => this.updateInput()}
            name="email"
            value={this.state.email}
            // errorText={this.props.errors.firstName}
          />
          <br/>
          <br/>
          <RaisedButton
            label="Change Password"
            primary={true}
            onClick={this.changePassword}
          />
        </div>
        <div className="col-12 col-md-6 text-center">
          <Paper style={style.portraitStyle} zDepth={1} circle={true}>
            <img src="http://i.imgur.com/0mVGhzd.jpg" alt="Portrait" style={style.imageStyle}/>
          </Paper>
          <RaisedButton
            label="Change Avatar"
            primary={true}
            onClick={this.changeAvatar}
          />
        </div>
      </div>
    )
  }
}
