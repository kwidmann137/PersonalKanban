import Api from '../../../../helpers/Api';
import { loading, doneLoading } from "../../../actions/index";

export const categories = (action, next, store) => {

  switch(action.type) {
    case 'SAVE_CATEGORIES':
      return new Promise((resolve, reject) => {
        store.dispatch(loading());
        Api.post('/updateCategories', {
          categories: action.categories
        })
          .then(resp =>{
            action.categories = resp.data;
            next(action);
            resolve();
            store.dispatch(doneLoading());
          })
          .catch(error => {
            reject(error);
            store.dispatch(doneLoading());
          });
      });
    case 'DELETE_CATEGORY':
      return new Promise((resolve, reject) => {
        store.dispatch(loading());

        //If this category was not saved on the server, just pass through
        if(action.category.id === null){
          next(action);
          resolve();
          store.dispatch(doneLoading());
        }else{
          Api.post('/deleteCategory', {
            category: action.category
          })
            .then(resp => {
              next({
                type: 'DELETE_ITEMS_BY_CATEGORY',
                category: action.category
              });
              next(action);
              resolve();
              store.dispatch(doneLoading());
            })
            .catch(error => {
              reject(error.response.data);
              store.dispatch(doneLoading());
            });
        }
      });
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
