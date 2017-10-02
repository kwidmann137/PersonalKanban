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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      stepIndex: 0,
      loading: false
    };

  }

  updateInput = (evt, value) => {
    let newState = this.state;
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

        //ToDo: Redirect to dashboard

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.setState({errors: emptyErrors});
  };

  setErrors = (errors) =>{
    let newState = this.state;

    for(let key in errors){
      let field = errors[key].field;
      newState.errors[field] = errors[key].message;
    }

    this.setState(newState, function(){
      console.log(this.state);
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
            />
            <RaisedButton
              label={stepIndex === finalStep ? 'Finish' : 'Next'}
              primary={true}
              onClick={stepIndex === finalStep ? this.submitForm : this.handleNext}
            />
          </div>

        </Card>
      </div>
    )
  }

}
