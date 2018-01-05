import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../components/progressBar/ProgressBar';
import ProgressBarSection from "../components/progressBar/ProgressBarSection";
import {getScheduledItems} from "../../util/ItemHelpers";

const sectionColors = [
  '33b440',
  'f0c537'
];

const mapStateToProps = (state) => {
  return {
    sections: getSections(state.items, state.boardStages),
    totalCount: getScheduledItems(state.items).length
  }
};

const CurrentProgressBar = ({sections, totalCount}) => (
  <ProgressBar>
    {
      sections.map((section, index) => {
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
