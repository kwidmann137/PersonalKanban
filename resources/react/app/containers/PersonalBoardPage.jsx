import React from 'react';
import { connect } from 'react-redux';
import DragDropBoard from 'Components/DragDropBoard';
import DroppableColumn from "../components/sortComponents/DroppableColumn";
import DraggableStickyNote from "../components/DraggableStickyNote";
import { updateStickyNoteStage, deleteItem } from "../actions/index";
import NoItemsMessage from '../components/NoItemsMessage';

const mapStateToProps = (state) => {
  return {
    itemsByStage: sortItemsByStage(state.items, state.boardStages),
    categories: state.categories,
    stages: state.boardStages,
    hasItems: state.items.length > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDragEnd: (result) => dispatch(updateStickyNoteStage(result)),
    deleteNote: (index) => dispatch(deleteItem(index))
  }
};

const PersonalBoardPage = ({itemsByStage, categories, stages, hasItems, deleteNote, onDragEnd}) => {
  return (
    <DragDropBoard onDragEnd={onDragEnd}>
      {
        !hasItems &&
          <NoItemsMessage />
      }
      {
        hasItems &&
        stages.map((stage, stageIndex) => (
            <DroppableColumn key={stageIndex} id={stageIndex} title={stage.name} style={{}}>
              {
                itemsByStage[stageIndex].map((note, noteIndex) => (
                  <DraggableStickyNote
                    key={noteIndex}
                    id={stageIndex + '-' + noteIndex}
                    note={note}
                    deleteNote={deleteNote}
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
