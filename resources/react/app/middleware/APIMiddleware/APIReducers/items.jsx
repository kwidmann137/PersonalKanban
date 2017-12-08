export const items = (action, next, store) => {

  switch(action.type) {
    case "DELETE_ITEMS_BY_CATEGORY":
      return new Promise((resolve, reject) => {

      });

    case "SET_ITEMS":

    case "ADD_ITEM":

    case "DELETE_ITEM":

    case "UPDATE_ITEM_STAGE":

    case "UPDATE_ITEM_SORTING":

    case "UPDATE_ITEM_ITEM":

    default:
      return new Promise((resolve, reject) => {
        try{
          next(action);
          resolve();
        }catch(error){
          reject(error);
        }
      });
  }
};
