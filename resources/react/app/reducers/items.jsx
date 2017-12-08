const itemsArray = [];

const items = ( state = itemsArray, action) => {

  let fromStage, fromIndex, toStage, toIndex, sortedItems, note, newItems;

  switch(action.type){
    case "SET_ITEMS":
      return action.items;
    case "ADD_ITEM":
      newItems = [
        {
          description: action.description,
          due_date: new Date(action.due_date).toDateString(),
          category_id: action.category_id,
          estimated_time: action.estimated_time,
          // index: 0,
          stage: 0,
          stageIndex: 0,
          sortingStage: 0,
          sortingIndex: 0,
        },
        ...state
      ];
      // newItems.forEach((item, index) => (item.index = index));
      return newItems;

    case "DELETE_ITEM":
      newItems = [...state];
      newItems = newItems.filter(item => item.id !== action.item.id);
      // newItems.forEach((item, index) => (item.index = index));
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

      action.boardStages.map((stage, stageIndex) => {
        sortedItems[stageIndex] = state.filter((item) => (item.stage === stageIndex));
        sortedItems[stageIndex].sort((a, b) => (a.stageIndex - b.stageIndex));
      });

      note = sortedItems[fromStage].slice(fromIndex, fromIndex + 1)[0];
      sortedItems[fromStage].splice(fromIndex, 1);
      note.stage = toStage;
      note.stageIndex = toIndex;
      sortedItems[toStage].splice(toIndex, 0, note);

      newItems = [];

      for(let stage = 0; stage < action.boardStages.length; stage++){
        sortedItems[stage].forEach((note, noteIndex) => (note.stageIndex = noteIndex));
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

      action.sortingStages.map((stage, stageIndex) => {
        sortedItems[stageIndex] = state.filter((item) => (item.sortingStage === stageIndex));
        sortedItems[stageIndex].sort((a, b) => (a.sortingIndex - b.sortingIndex));
      });

      note = sortedItems[fromStage].slice(fromIndex, fromIndex + 1)[0];
      sortedItems[fromStage].splice(fromIndex, 1);
      note.sortingStage = toStage;
      note.sortingIndex = toIndex;
      sortedItems[toStage].splice(toIndex, 0, note);

      newItems = [];

      for(let stage = 0; stage < action.sortingStages.length; stage++){
        sortedItems[stage].forEach((note, noteIndex) => (note.sortingIndex = noteIndex));
        newItems = newItems.concat(sortedItems[stage]);
      }

      // newItems.forEach((item, index) => (item.index = index));
      return newItems;
    default:
      return state;
  }
};

export default items;
