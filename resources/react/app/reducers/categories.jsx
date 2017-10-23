const initialCategories = [
  {
    name: 'Home',
    color: '#FAEE76',
    hours: [
      1, 1, 1, 1, 1, 3, 3
    ]
  },
  {
    name: 'Work',
    color: '#FD892C',
    hours: [
      8, 8, 8, 8, 8, 0, 0
    ]
  },
  {
    name: 'School',
    color: '#86CBFB',
    hours: [
      6, 6, 6, 6, 6, 6, 6
    ]
  }
];

const categories = (state = initialCategories, action) => {

  let newState = [...state];

  switch(action.type){
    case "ADD_CATEGORY":
      return [
        ...state,
        {
          name: '',
          color: '#FAEE76',
          hours: [
            0, 0, 0, 0, 0, 0, 0
          ]
        }
      ];
    case 'UPDATE_CATEGORY_COLOR':
      newState[action.category].color = action.color;
      return newState;
    case 'UPDATE_CATEGORY_NAME':
      newState[action.category].name = action.name;
      return newState;
    case 'UPDATE_CATEGORY_HOURS':
      newState[action.category].hours = action.hours;
      return newState;
    default:
      return state;
  }
};

export default categories;
