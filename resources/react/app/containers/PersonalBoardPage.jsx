import React from 'react';
import { connect } from 'react-redux';
import DragDropBoard from 'Components/DragDropBoard';
import DroppableColumn from "../components/sortComponents/DroppableColumn";
import DraggableStickyNote from "../components/DraggableStickyNote";
import { updateItemStage, deleteItem } from "../actions/index";
import NoItemsMessage from '../components/NoItemsMessage';
import {getScheduledItems} from "../../util/ItemHelpers";

const mapStateToProps = (state) => {
  return {
    itemsByStage: sortItemsByStage(state.items, state.categories, state.boardStages),
    categories: state.categories,
    stages: state.boardStages,
    hasItems: state.items.length > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDragEnd: (result) => dispatch(updateItemStage(result)),
    deleteItem: (item) => dispatch(deleteItem(item))
  }
};

const PersonalBoardPage = ({itemsByStage, categories, stages, hasItems, deleteItem, onDragEnd}) => {
  console.log(itemsByStage);
  return (
    <DragDropBoard onDragEnd={onDragEnd}>
      {
        !hasItems &&
          <NoItemsMessage />
      }
      {
        //ToDo: Remove the categories.length check and fix loading initial state before render
        hasItems && categories.length > 0 &&
        stages.map((stage, stageIndex) => (
            <DroppableColumn key={stageIndex} id={stageIndex} title={stage.name} style={{}}>
              {
                itemsByStage[stageIndex].map((note, noteIndex) => (
                  <DraggableStickyNote
                    key={noteIndex}
                    id={stageIndex + '-' + noteIndex}
                    note={note}
                    deleteItem={deleteItem}
                    style={getNoteStyle(note.category_id, categories)}
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

const sortItemsByStage = (items, categories, stages) => {
  if(items.length > 0 && categories.length > 0){
    items = getScheduledItems(items);
    console.log("got items from helper");
    console.log(items);
  }
  let sortedItems = [];
  for(let stage = 0; stage < stages.length; stage++){
    sortedItems[stage] = items.filter(item => item.stage === stage);
    sortedItems[stage].sort((a, b) => (a.stage_index - b.stage_index));
  }
  console.log("returning sorted items by stage");
  console.log(sortedItems);
  sortedItems.forEach(item => {
    delete item.start;
    delete item.end;
  });
  return sortedItems;
};

const getNoteStyle = (category_id, categories) => {
  let category = categories.filter(category => category.id === category_id)[0];
  let color = 'transparent';
  if(category){
    color = category.color;
  }
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
