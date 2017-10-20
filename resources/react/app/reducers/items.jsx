const itemsArray = [
  {
    text: 'LISP Programming Assignment 1',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 6,
    stage: 0,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Make index cards for OO',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 2,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Make index cards for CA',
    dueDate: new Date('10/23/2017').toDateString(),
    category: 2,
    estimatedTime: 2,
    stage: 1,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Read chapter 3.1 for CA',
    dueDate: new Date('10/25/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 0,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Turn in labs for Cloud Security',
    dueDate: new Date('10/20/2017').toDateString(),
    category: 2,
    estimatedTime: 1,
    stage: 1,
    priority: 0,
    priorityIndex: 0,
  },
  {
    text: 'Sign timesheet for work',
    dueDate: new Date('10/27/2017').toDateString(),
    category: 1,
    estimatedTime: 1,
    stage: 0,
    priority: 0,
    priorityIndex: 0,
  },
];

const items = ( state = itemsArray, action) => {
  console.log("ITEMS REDUCER");
  console.log(action.type);
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
    default:
      return state;
  }
};

export default items;
