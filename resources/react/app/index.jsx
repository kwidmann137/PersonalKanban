import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AppStore from './reducers/index'
import App from './components/App'
import APIMiddleware from "./middleware/APIMiddleware/index";
import Api from '../helpers/Api';
import { setItems } from "./actions/index";
import { saveCategories } from "./actions/index";


const store = createStore(
  AppStore,
  applyMiddleware(APIMiddleware)
);


Api.get('/getCategories')
  .then(resp => {
    store.dispatch(saveCategories(resp.data));
  })
  .catch(err => {
    console.log(err);
  });

Api.get('/getItems')
  .then(resp => {
    store.dispatch(setItems(resp.data));
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

export default store;

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
