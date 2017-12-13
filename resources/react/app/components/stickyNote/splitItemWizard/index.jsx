import React from 'react';
import Card from 'material-ui/Card';
import StepConnector from './stepConnector';
import SplitItemSteps from './steps';

export default class SplitItemWizard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      numOfSplits: getRecommendedSplits(props.splitData),
      recommendSplits: getRecommendedSplits(props.splitData),
      splitOptions: getSplitOptions(props.splitData),
      currStep: 1,
    }
  }

  handleNext = () =>{
    if (this.state.currStep < 2) {
      this.setState({currStep: this.state.currStep + 1});
    }
  };

  handlePrev = () => {
    if (this.state.currStep > 1) {
      this.setState({currStep: this.state.currStep - 1});
    }
  };

  render(){

    return (
      <div>
        <Card style={cardStyle}>
          <StepConnector stepIndex={this.state.currStep}/>

          <SplitItemSteps
            step={this.state.currStep}
            recommendedSplits={this.state.recommendSplits}
            splits={this.state.numOfSplits}
            splitOptions={this.state.splitOptions}
            updateSplits={(numSplits) => this.setState({numOfSplits: numSplits})}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            originalItem={this.props.originalItem}
            addItems={this.props.addItems}
            toggleAddItem={this.props.toggleAddItem}
          />
        </Card>
      </div>
    );
  }
}

const getSplitOptions = (splitData, item) => {
  const splitOptions = [];
  const minSplits = getMinSplits(splitData, item);
  const maxSplits = getMaxSplits(splitData, item);
  for(let option = minSplits; option <= maxSplits; option++){
    splitOptions.push(option);
  }
  return splitOptions;
};

const getMinSplits = (splitData) => {

  const minSplits = 2;
  let splits = 0;
  let totalCategoryTime = 0;

  console.log(splitData);

  Object.keys(splitData.worstCaseAvailability).forEach(date => {
    if(totalCategoryTime < splitData.itemTotalTime){
      splits ++;
      totalCategoryTime += splitData.worstCaseAvailability[date];
    }
  });

  return splits < minSplits ? minSplits : splits;
};

const getRecommendedSplits = (splitData) => {

  let splits = Math.ceil(splitData.itemTotalTime / splitData.avgCategoryTime);
  if(splitData.itemTotalTime/splits < 1){
    splits = Math.floor(splitData.itemTotalTime);
  }

  const minSplits = getMinSplits(splitData);

  return splits > minSplits ? splits : minSplits;

};

const getMaxSplits = (splitData) => {

  let splits = 0;
  let totalCategoryTime = 0;

  Object.keys(splitData.worstCaseAvailability).forEach(date => {
    splits ++;
    totalCategoryTime += splitData.worstCaseAvailability[date];
  });

  return splits;

};


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
  padding: '25px'
};
