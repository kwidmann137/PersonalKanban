
export const addItem = (text, category, estimatedTime, dueDate, ) => {
  return {
    type: 'ADD_ITEM',
    text,
    category,
    estimatedTime,
    dueDate
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
