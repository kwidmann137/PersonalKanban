import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

export default class StepConnect extends React.Component{

  render(){
    return(
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={this.props.stepIndex - 1} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel>How Many?</StepLabel>
          </Step>

          <Step>
            <StepLabel>Create</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}
