const itemsArray = [
  {
    text: 'LISP Programming Assignment 1',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 6,
    stage: 0,
    stageIndex: 0,
    sortingStage: 0,
    sortingIndex: 0,
  },
  {
    text: 'Make index cards for OO',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 2,
    stageIndex: 0,
    sortingStage: 0,
    sortingIndex: 0,
  },
  {
    text: 'Make index cards for CA',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 2,
    stage: 1,
    stageIndex: 0,
    sortingStage: 0,
    sortingIndex: 0,
  },
  {
    text: 'Read chapter 3.1 for CA',
    dueDate: new Date('10/25/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 0,
    stageIndex: 1,
    sortingStage: 0,
    sortingIndex: 0,
  },
  {
    text: 'Turn in labs for Cloud Security',
    dueDate: new Date('10/20/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 1,
    stageIndex: 1,
    sortingStage: 0,
    sortingIndex: 0,
  },
  {
    text: 'Sign timesheet for work',
    dueDate: new Date('10/27/2017').toDateString(),
    category: 1,
    estimatedTime: 1,
    stage: 0,
    stageIndex: 2,
    sortingStage: 0,
    sortingIndex: 0,
  },
];

const items = ( state = itemsArray, action) => {

  let fromStage, fromIndex, toStage, toIndex, sortedItems, note, newItems;

  switch(action.type){
    case "ADD_ITEM":
      newItems = [
        {
          text: action.text,
          dueDate: action.dueDate.toDateString(),
          category: action.category,
          estimatedTime: action.estimatedTime,
          index: 0,
          stage: 0,
          stageIndex: 0,
          sortingStage: 0,
          sortingIndex: 0,
        },
        ...state
      ];
      newItems.forEach((item, index) => (item.index = index));
      return newItems;
    case "DELETE_ITEM":
      let newItems = [...state];
      newItems.splice(action.index, 1);
      newItems.forEach((item, index) => (item.index = index));
      return newItems;
    case "UPDATE_STICKY_NOTE_STAGE":

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

      newItems.forEach((item, index) => (item.index = index));
      return newItems;
    case "UPDATE_STICKY_NOTE_SORTING":

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

      newItems.forEach((item, index) => (item.index = index));
      return newItems;
    default:
      return state;
  }
};

export default items;
