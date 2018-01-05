import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class SplitStep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
            {
              this.props.splitOptions.length === 1 &&
                <p>{`Looks like you need to split this up into ${this.props.recommendedSplits} to make this fit.`}</p>
            }
            {
              this.props.splitOptions.length > 1 &&
                <p>{`We recommend you split this item into ${this.props.recommendedSplits} tasks, but its your choice.  How many would you like?`}</p>
            }

          {
            this.props.splitOptions.map((option, index) => {

              let style = {
                boxShadow: option === this.props.splits ? '-3px 3px 10px 2px #777' : 'none',
                marginRight: 10
              };

              return(
                <FloatingActionButton
                  key={index}
                  style={style}
                  onClick={() => this.props.updateSplits(option)}
                >
                  {option}
                </FloatingActionButton>
              )
            })
          }

        </div>

        <div style={{marginTop: 24, marginBottom: 12}}>
          <RaisedButton
            label='Next'
            primary={true}
            onClick={this.props.handleNext}
          />
        </div>
      </div>
    )
  }
};
