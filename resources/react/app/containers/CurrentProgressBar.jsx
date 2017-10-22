import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'Components/ProgressBar';
import ProgressBarSection from "../components/ProgressBarSection";

const sectionColors = [
  '50B762',
  'FCD74C'
];

const mapStateToProps = (state) => {
  return {
    sections: getSections(state.items, state.stages),
    totalCount: state.items.length
  }
};

const CurrentProgressBar = ({sections, totalCount}) => (
  <ProgressBar>
    {
      sections.map((section, index) => {
        console.log(section);
        console.log(sectionColors[index]);
        console.log((section.count/totalCount) * 100);
        console.log(10 - section.index);
        if(index === sections.length - 1){
          return;
        }
        return (
          <ProgressBarSection
            key={index}
            color={sectionColors[index]}
            width={(section.count/totalCount) * 100}
            zDepth={10 - section.index}
          />
        )
      })
    }
  </ProgressBar>
);

export default connect(
  mapStateToProps,
)(CurrentProgressBar);

const getSections = (items, stages) => {
  let sections = [];
  let totalCount = items.length;

  stages.forEach((stage, stageIndex) => {
    let section = {};
    section.name = stage.name;
    section.index = stages.length - stageIndex - 1;
    section.count = totalCount;
    totalCount -= items.filter((item) => (item.stage === stageIndex)).length;
    sections.push(section);
  });

  sections.sort((a, b) => (a.index - b.index));

  return sections;
};
