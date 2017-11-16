import store from '../index';

export const addItem = (text, category, estimatedTime, dueDate, ) => {
  return {
    type: 'ADD_ITEM',
    text,
    category,
    estimatedTime,
    dueDate
  }
};

export const deleteItem = (index) => {
  return {
    type: 'DELETE_ITEM',
    index
  }
};

export const updateStickyNoteStage = (result) => {

  const { boardStages } = store.getState();

  return {
    type: "UPDATE_STICKY_NOTE_STAGE",
    result,
    boardStages
  }
};

export const updateStickyNoteSorting = (result) => {
  const { sortingStages } = store.getState();

  return {
    type: "UPDATE_STICKY_NOTE_SORTING",
    result,
    sortingStages
  }
};

export const toggleAddItem = () => {
  return {
    type: "TOGGLE_ADD_ITEM"
  }
};

export const updateItem = (id, text, category,  estimatedTime, dueDate) => {
  return {
    type: 'UPDATE_ITEM',
    id,
    text,
    category,
    estimatedTime,
    dueDate
  }
};

export const updateItemStage = (item, stage) => {
  return {
    type: 'UPDATE_ITEM_STAGE',
    item,
    stage
  }
};

export const updateItemPriority =  (list, startColumn, startIndex, endColumn, endIndex) => {
  return {
    type: 'UPDATE_ITEM_PRIORITY',
    list,
    startColumn,
    startIndex,
    endColumn,
    endIndex
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

export const addCategory = () => {
  return {
    type: 'ADD_CATEGORY',
  }
};

export const saveCategories = (categories) => {
  return {
    type: 'SAVE_CATEGORIES',
    categories,
  }
};

export const updateCategoryColor = (color, category) => {
  return {
    type: 'UPDATE_CATEGORY_COLOR',
    color,
    category
  }
};

export const updateCategoryHours = (hours, category) => {
  return {
    type: 'UPDATE_CATEGORY_HOURS',
    hours,
    category
  }
};

export const updateCategoryName = (name, category) => {
  return {
    type: 'UPDATE_CATEGORY_NAME',
    name,
    category
  }
};
