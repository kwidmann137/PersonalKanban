import React from 'react';
import Card from 'material-ui/Card';
import StepConnector from './StepConnector';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RegisterFormSteps from './RegisterFormSteps';
import axios from 'axios';
import LoadingIndicator from '../../common/components/LoadingIndicator';

const cardStyle = {
  maxWidth: '500px',
  minWidth: '350px',
  minHeight: '300px',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0 auto',
  textAlign: 'center',
  padding: '25px 0'
};

export default class RegisterForm extends React.Component{

  constructor(props){
    super(props);

    this.state= {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      stepIndex: 0,
      loading: false
    };

  }

  updateInput = (evt, value) => {
    let newState = {...this.state};
    newState.user[evt.target.name] = value;
    this.setState(newState);
  };

  handleNext = () =>{
    const {stepIndex} = this.state;

    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  submitForm = () => {
    const {user} = this.state;
    let self = this;

    this.setState({loading: true});

    axios.post("/register", user)
      .then(function(resp){

        self.clearErrors();
        self.setState({loading: false});

        window.location.href = "/app";
      })
      .catch(function (error){

        if(error.response.status === 405){
          self.clearErrors();
          self.setErrors(error.response.data);
        }

        if(error.response.status === 400){
          self.clearErrors();
          alert("Failed to create new user. Please try again.");
        }

        self.setState({loading: false});
      })
  };

  clearErrors = () => {

    const emptyErrors = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    };

    this.setState({errors: emptyErrors});
  };

  setErrors = (errors) =>{
    let newState = {...this.state};
    let self = this;

    Object.values(errors).map(error => {
      newState.errors[error.field] = error.message;
    });

    this.setState(newState, function(){
      if(self.state.errors.first_name.length > 0 || self.state.errors.last_name.length > 0){
        self.setState({stepIndex: 0});
      }else if(self.state.errors.email.length > 0){
        self.setState({stepIndex: 1});
      }else if(self.state.errors.password.length > 0 || self.state.errors.confirm_password.length > 0){
        self.setState({stepIndex: 2});
      }
    });
  };

  render(){

    const {stepIndex} = this.state;
    const finalStep = 2;

    return (
      <div>
        {
          this.state.loading &&
            <LoadingIndicator/>
        }
        <Card style={cardStyle}>
          <StepConnector stepIndex={stepIndex} errors={this.state.errors}/>

          <RegisterFormSteps
            stepIndex={stepIndex}
            updateInput={this.updateInput}
            user={this.state.user}
            errors={this.state.errors}
          />

          <div style={{marginTop: 24, marginBottom: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
              name="back"
            />
            <RaisedButton
              label={stepIndex === finalStep ? 'Finish' : 'Next'}
              primary={true}
              onClick={stepIndex === finalStep ? this.submitForm : this.handleNext}
              name="submit"
            />
          </div>

        </Card>
      </div>
    )
  }

}
