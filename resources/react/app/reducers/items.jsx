const itemsArray = [];

const items = ( state = itemsArray, action) => {

  let fromStage, fromIndex, toStage, toIndex, sortedItems, note, newItems;

  switch(action.type){
    case "SET_ITEMS":
      return action.items;
    case "ADD_ITEM":
      newItems = [
        action.item,
        ...state
      ];
      return newItems;

    case "ADD_ITEMS":
      newItems = [
        action.items,
        ...state
      ];
      return newItems;

    case "DELETE_ITEM":
      newItems = [...state];
      newItems = newItems.filter(item => item.id !== action.item.id);
      return newItems;

    case "DELETE_ITEMS_BY_CATEGORY":
      /**
       * This is only called by the API Middleware when a category is deleted
       */
      newItems = [...state];
      newItems = newItems.filter(item => item.category_id !== action.category.id);
      return newItems;

    case "UPDATE_ITEM_STAGE":

      if(!action.result.destination) return state;

      //check if source == dest, if so just update index
      fromStage = parseInt(action.result.source.droppableId);
      fromIndex = action.result.source.index;
      toStage = parseInt(action.result.destination.droppableId);
      toIndex = action.result.destination.index;

      sortedItems = [];

      action.boardStages.map((stage, stage_index) => {
        sortedItems[stage_index] = state.filter((item) => (item.stage === stage_index));
        sortedItems[stage_index].sort((a, b) => (a.stage_index - b.stage_index));
      });

      note = sortedItems[fromStage].slice(fromIndex, fromIndex + 1)[0];
      sortedItems[fromStage].splice(fromIndex, 1);
      note.stage = toStage;
      note.stage_index = toIndex;
      note.completed = (note.stage === action.boardStages.length - 1);
      if(note.completed && fromStage !== action.boardStages.length - 1){
        note.completed_date = new Date().toISOString().slice(0,10);
        console.log(note);
      }else{
        note.completed_date = null
      }
      sortedItems[toStage].splice(toIndex, 0, note);

      newItems = [];



      for(let stage = 0; stage < action.boardStages.length; stage++){
        sortedItems[stage].forEach((note, noteIndex) => (note.stage_index = noteIndex));
        newItems = newItems.concat(sortedItems[stage]);
      }



      // newItems.forEach((item, index) => (item.index = index));
      return newItems;

    case "UPDATE_ITEM_SORTING":

      if(!action.result.destination) return state;

      //ToDo: Refactor to remove duplicate code from update stage
      //check if source == dest, if so just update index
      fromStage = parseInt(action.result.source.droppableId);
      fromIndex = action.result.source.index;
      toStage = parseInt(action.result.destination.droppableId);
      toIndex = action.result.destination.index;

      sortedItems = [];

      action.sortingStages.map((stage, stage_index) => {
        sortedItems[stage_index] = state.filter((item) => (item.sorting_stage === stage_index));
        sortedItems[stage_index].sort((a, b) => (a.sorting_index - b.sorting_index));
      });

      note = sortedItems[fromStage].slice(fromIndex, fromIndex + 1)[0];
      sortedItems[fromStage].splice(fromIndex, 1);
      note.sorting_stage = toStage;
      note.sorting_index = toIndex;
      sortedItems[toStage].splice(toIndex, 0, note);

      newItems = [];

      for(let stage = 0; stage < action.sortingStages.length; stage++){
        sortedItems[stage].forEach((note, noteIndex) => (note.sorting_index = noteIndex));
        newItems = newItems.concat(sortedItems[stage]);
      }

      // newItems.forEach((item, index) => (item.index = index));
      return newItems;
    default:
      return state;
  }
};

export default items;
