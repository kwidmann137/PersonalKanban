const itemsArray = [
  {
    text: 'LISP Programming Assignment 1',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 6,
    stage: 0,
    stageIndex: 0,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Make index cards for OO',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 2,
    stageIndex: 0,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Make index cards for CA',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 2,
    stage: 1,
    stageIndex: 0,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Read chapter 3.1 for CA',
    dueDate: new Date('10/25/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 0,
    stageIndex: 1,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Turn in labs for Cloud Security',
    dueDate: new Date('10/20/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 1,
    stageIndex: 1,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Sign timesheet for work',
    dueDate: new Date('10/27/2017').toDateString(),
    category: 1,
    estimatedTime: 1,
    stage: 0,
    stageIndex: 2,
    priority: 0,
    priorityIndex: 0,
  },
];

const items = ( state = itemsArray, action) => {
  switch(action.type){
    case "ADD_ITEM":
      return [
        {
          text: action.text,
          dueDate: action.dueDate.toDateString(),
          category: action.category,
          estimatedTime: action.estimatedTime,
          stage: 0,
          priority: 0,
          priorityIndex: 0,
        },
        ...state
      ];
    case "STICKY_NOTE_DRAGGED":

      //check if source == dest, if so just update index
      let fromStage = parseInt(action.result.source.droppableId);
      let fromIndex = action.result.source.index;
      let toStage = parseInt(action.result.destination.droppableId);
      let toIndex = action.result.destination.index;

      let sortedItems = [];

      action.stages.map((stage, stageIndex) => {
        sortedItems[stageIndex] = state.filter((item) => (item.stage === stageIndex));
        sortedItems[stageIndex].sort((a, b) => (a.stageIndex - b.stageIndex));
      });

      let note = sortedItems[fromStage].slice(fromIndex, fromIndex + 1)[0];
      sortedItems[fromStage].splice(fromIndex, 1);
      note.stage = toStage;
      note.stageIndex = toIndex;
      sortedItems[toStage].splice(toIndex, 0, note);

      let newItems = [];

      for(let stage = 0; stage < sortedItems.length; stage++){
        sortedItems[stage].forEach((note, noteIndex) => (note.stageIndex = noteIndex));
        newItems = newItems.concat(sortedItems[stage]);
      }

      return newItems;
    case "STICKY_NOTE_SORTED":

    default:
      return state;
  }
};

export default items;
