import React from 'react';
import { connect } from 'react-redux';
import DragDropBoard from 'Components/DragDropBoard';
import DroppableColumn from "../components/sortComponents/DroppableColumn";
import DraggableStickyNote from "../components/DraggableStickyNote";
import { updateItemSorting, deleteItem } from "../actions/index";
import NoItemsMessage from '../components/NoItemsMessage';

const mapStateToProps = (state) => {
  return {
    itemsByStage: sortItemsByStage(state.items, state.sortingStages),
    categories: state.categories,
    stages: state.sortingStages,
    hasItems: state.items.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDragEnd: (result) => dispatch(updateItemSorting(result)),
    deleteItem: (item) => dispatch(deleteItem(item))
  }
};

const SortPage= ({itemsByStage, categories, deleteItem, stages, hasItems, onDragEnd}) => {
  return (
    <div>
      {
        !hasItems &&
          <NoItemsMessage />
      }
      {
        hasItems &&
          <div>
            <h1 className="text-center"> Priority</h1>
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
                            deleteItem={deleteItem}
                            style={getNoteStyle(note, categories)}
                          />
                        ))
                      }
                    </DroppableColumn>
                  )
                )
              }
            </DragDropBoard>
          </div>
      }
    </div>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortPage);

const sortItemsByStage = (items, stages) => {
  let sortedItems = [];
  for(let stage = 0; stage < stages.length; stage++){
    sortedItems[stage] = items.filter(item => item.sorting_stage === stage);
    sortedItems[stage].sort((a, b) => (a.sorting_index - b.sorting_index));
  }
  return sortedItems;
};

const getNoteStyle = (note, categories) => {
  let category = categories.filter(category => category.id === note.category_id)[0];
  let color = 'transparent';
  if(category){
    color = category.color;
  }
  return {
    height: 200,
    width: 200,
    margin: '10px auto',
    padding: '15px',
    position: 'relative',
    fontFamily: 'Architects Daughter, cursive',
    fontSize: 18,
    transform: 'rotate(' + (Math.random() * (2 - -2) + -2).toString() + 'deg)',
    left: (Math.random() * (10 - -10) + -10).toString() + 'px',
    backgroundColor: color,
    overflow: 'hidden',
  }
};
