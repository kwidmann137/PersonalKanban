import React from 'react';
import { connect } from 'react-redux';
import DragDropBoard from 'Components/DragDropBoard';
import DroppableColumn from "../components/sortComponents/DroppableColumn";
import DraggableStickyNote from "../components/DraggableStickyNote";
import { stickyNoteDragged } from "../actions/index";

const mapStateToProps = (state) => {
  return {
    itemsByStage: sortItemsByStage(state.items, state.stages),
    categories: state.categories,
    stages: state.stages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDragEnd: (result) => dispatch(stickyNoteDragged(result))
  }
};

const PersonalBoardPage = ({itemsByStage, categories, stages, onDragEnd}) => {
  return (
    <DragDropBoard onDragEnd={onDragEnd}>
      {
        stages.map((stage, stageIndex) => (
            <DroppableColumn key={stageIndex} id={stageIndex} title={stage.name} style={{}}>
              {
                itemsByStage[stageIndex].map((note, noteIndex) => (
                  <DraggableStickyNote
                    key={noteIndex}
                    id={stageIndex + '-' + noteIndex}
                    note={note}
                    style={getNoteStyle(categories[note.category].color)}
                  />
                ))
              }
            </DroppableColumn>
          )
        )
      }
    </DragDropBoard>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalBoardPage);

const sortItemsByStage = (items, stages) => {
  let sortedItems = [];
  for(let stage = 0; stage < stages.length; stage++){
    sortedItems[stage] = items.filter(item => item.stage === stage);
    sortedItems[stage].sort((a, b) => (a.stageIndex - b.stageIndex));
  }
  return sortedItems;
};

const getNoteStyle = (color) => {
  return {
    height: 300,
    width: 300,
    margin: '10px auto',
    padding: '15px',
    position: 'relative',
    fontFamily: 'Architects Daughter, cursive',
    fontSize: 18,
    transform: 'rotate(' + (Math.random() * (2 - -2) + -2).toString() + 'deg)',
    left: (Math.random() * (10 - -10) + -10).toString() + 'px',
    backgroundColor: color
  }
};
