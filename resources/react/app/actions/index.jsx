import store from '../index';


export const toggleAddItem = () => {
  return {
    type: "TOGGLE_ADD_ITEM"
  }
};

export const setItems = (items) => {
  return {
    type: 'SET_ITEMS',
    APIReducer: 'items',
    items
  }
};

export const addItem = (description, category_id, estimated_time, due_date, ) => {
  return {
    type: 'ADD_ITEM',
    APIReducer: 'items',
    description,
    category_id,
    estimated_time,
    due_date
  }
};

export const deleteItem = (index) => {
  return {
    type: 'DELETE_ITEM',
    APIReducer: 'items',
    index
  }
};


export const updateItem = (id, text, category,  estimatedTime, dueDate) => {
  return {
    type: 'UPDATE_ITEM',
    APIReducer: 'items',
    id,
    text,
    category,
    estimatedTime,
    dueDate
  }
};

export const updateItemStage = (result) => {

  const { boardStages } = store.getState();

  return {
    type: "UPDATE_ITEM_STAGE",
    APIReducer: 'items',
    result,
    boardStages
  }
};

export const updateItemSorting = (result) => {

  const { sortingStages } = store.getState();

  return {
    type: "UPDATE_ITEM_SORTING",
    APIReducer: 'items',
    result,
    sortingStages
  }
};

export const updateUser = (firstName, lastName, email) => {
  return {
    type: 'UPDATE_USER',
    firstName,
    lastName,
    email
  }
};

export const saveCategories = (categories) => {
  return {
    type: 'SAVE_CATEGORIES',
    APIReducer: 'categories',
    categories,
  }
};

export const deleteCategory = category => {
  return {
    type: 'DELETE_CATEGORY',
    APIReducer: 'categories',
    category,
  }
};

export const loading = () => {
  return {
    type: 'LOADING',
  }
};

export const doneLoading = () => {
  return {
    type: 'DONE_LOADING',
  }
};
