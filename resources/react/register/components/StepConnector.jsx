import React from 'react';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {red500} from 'material-ui/styles/colors';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

/**
 * It is possible to specify your own step connector by passing an element to the `connector`
 * prop. If you want to remove the connector, pass `null` to the `connector` prop.
 */
class StepConnector extends React.Component {

  constructor(props) {
    super(props);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>What's your name?</p>
        );

      case 1:
        return (
          <p>What's your email?</p>
        );

      case 2:
        return (
          <p>Choose a password</p>
        );
    }
  }

  render() {

    const stepIndex = this.props.stepIndex;

    let step1Props = {};
    let step2Props = {};
    let step3Props = {};
    if(this.props.errors.firstName.length > 0 || this.props.errors.lastName.length > 0){
      step1Props = {
        icon: <WarningIcon color={red500} />,
        style: {color: red500}
      }
    }

    if(this.props.errors.email.length > 0){
      step2Props = {
        icon: <WarningIcon color={red500} />,
        style: {color: red500}
      }
    }

    if(this.props.errors.password.length > 0 || this.props.errors.confirmPassword.length > 0){
      step3Props = {
        icon: <WarningIcon color={red500} />,
        style: {color: red500}
      }
    }



    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel{...step1Props}>Name</StepLabel>
          </Step>

          <Step>
            <StepLabel{...step2Props}>Email</StepLabel>
          </Step>

          <Step>
            <StepLabel{...step3Props}>Password</StepLabel>
          </Step>
        </Stepper>

        {this.getStepContent(stepIndex)}

      </div>
    );
  }
}

export default StepConnector;
