import Api from '../../../../util/Api';
import { loading, doneLoading } from "../../../actions/index";

export const items = (action, next, store) => {

  switch(action.type) {
    case "ADD_ITEM":
      store.dispatch(loading());
      return new Promise((resolve, reject) => {
        Api.post('/addItem', {
          item: action.item
        })
          .then(resp => {
            console.log("Successfully added item");
            action.item = resp.data;
            console.log(action);
            next(action);
            resolve();
            store.dispatch(doneLoading());
          })
          .catch(error => {
            console.log("Failed to add item");
            reject(error);
            store.dispatch(doneLoading());
          })
      });
    case "ADD_ITEMS":
      store.dispatch(loading());
      return new Promise((resolve, reject) => {
        Api.post('/addItems', {
          items: action.items
        })
          .then(resp => {
            console.log("Successfully added items");
            action.items = resp.data;
            console.log(action);
            next(action);
            resolve();
            store.dispatch(doneLoading());
          })
          .catch(error => {
            console.log("Failed to add items");
            reject(error);
            store.dispatch(doneLoading());
          })
      });
    case "DELETE_ITEM":
      store.dispatch(loading());
      return new Promise((resolve, reject) => {
      Api.post('/deleteItem', {
        item: action.item
      })
        .then(resp => {
          console.log("Successfully deleted item");
          next(action);
          resolve();
          store.dispatch(doneLoading());
        })
        .catch(error => {
          console.log("Failed to delete item");
          reject(error);
          store.dispatch(doneLoading());
        })
      });
    case "UPDATE_ITEM_STAGE":
    case "UPDATE_ITEM_SORTING":
      next(action);
      //API Call to update all items;
      let { items } = store.getState();
      items = [...items];
      items.forEach(item => {
        delete item.start;
        delete item.end;
      });
      console.log("MIDDLEWARE ITEMS:");
      console.log(items);
      //ToDo: Consider putting this either on a timer to reduce traffic or somehow keeping data client side and sync periodically
      Api.post('/updateItems', {
        items: items
      })
        .then(resp => {
          console.log("Updated items successfully");
        })
        .catch(error => {
          console.log("Failed to update items");
          console.log(error);
        });
      break;
    case "UPDATE_ITEMS":
      //API Call to update all items;
      store.dispatch(loading());
      return new Promise((resolve, reject) => {
        Api.post('/updateItems', {
          items: action.items
        })
          .then(resp => {
            console.log("Successfully updated items");
            next(action);
            resolve();
            store.dispatch(doneLoading());
          })
          .catch(error => {
            console.log("Failed to update items");
            reject(error);
            store.dispatch(doneLoading());
          })
      });
      break;
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
