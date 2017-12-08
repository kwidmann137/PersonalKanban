let initialCategories = [];

const categories = (state = initialCategories, action) => {

  let newState = [...state];

  switch(action.type){
    case 'SAVE_CATEGORIES':
      return action.categories;
    case 'DELETE_CATEGORY':
      newState = newState.filter(category => category.id !== action.category.id);
      return newState;
    default:
      return state;
  }
};

export default categories;

