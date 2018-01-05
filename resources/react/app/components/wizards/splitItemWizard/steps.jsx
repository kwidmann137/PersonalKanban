import React from 'react';
import SplitStep from "./splitStep";
import CreateStep from "./createStep";

const SplitItemSteps = ({step, recommendedSplits, splits, splitOptions, updateSplits, handleNext, handlePrev
,originalItem, addItems, toggleAddItem}) => {

  switch(step){
    case 1:
      return (
        <SplitStep
          splitOptions={splitOptions}
          recommendedSplits={recommendedSplits}
          splits={splits}
          updateSplits={updateSplits}
          handleNext={handleNext}
        />
      );
    case 2:
      return (
        <CreateStep
          splits={splits}
          handlePrev={handlePrev}
          originalItem={originalItem}
          addItems={addItems}
          toggleAddItem={toggleAddItem}
        />
      );
  }


};

export default SplitItemSteps;
