import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AppStore from './reducers/index'
import App from './containers/App'
import APIMiddleware from "./middleware/APIMiddleware/index";
import Api from '../util/Api';
import { setItems } from "./actions/index";
import { saveCategories } from "./actions/index";


export const store = createStore(
  AppStore,
  applyMiddleware(APIMiddleware)
);


Api.get('/getCategories')
  .then(resp => {
    store.dispatch(saveCategories(resp.data));
    console.log('categories set');
  })
  .catch(err => {
    console.log(err);
  });

Api.get('/getItems')
  .then(resp => {
    store.dispatch(setItems(resp.data));
    console.log("items set");
    setTimeout(() => {
      // getCategoryHours(null, store.getState().items);
      // sortItemsForScheduling(store.getState().items);
      // setEarliestPossibleStartDate(store.getState().items);
    }, 1000);
  })
  .catch(err => {
    console.log(err);
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//
// let currentValue;
//
// function select(state) {
//   return state.categories
// }
//
// function listenForChange() {
//   let previousValue = currentValue
//   currentValue = select(store.getState())
//
//   if (previousValue !== currentValue) {
//     console.log(
//       'Categories changed',
//       previousValue,
//       'to',
//       currentValue
//     )
//   }
// }
//
// let unsubscribe = store.subscribe(listenForChange)
