import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppStore from './reducers/index'
import App from './components/App'

const store = createStore(AppStore);

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
