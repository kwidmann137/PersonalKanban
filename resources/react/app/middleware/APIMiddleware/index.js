import { items } from './APIReducers/items';
import { categories } from './APIReducers/categories';

const APIMiddleware = store => next => action => {

  //process API request if APIReducer is denoted in action
  switch(action.APIReducer){
    case "items":
      return items(action, next, store);
    case "categories":
      return categories(action, next, store);
    default:
      //pass through by default
      return new Promise(resolve => {
        next(action);
        resolve();
      });
  }
};

export default APIMiddleware;
