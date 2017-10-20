import { combineReducers } from 'redux';
import items from './items';
import categories from './categories';
import user from './user';

const AppStore = combineReducers({
  user,
  items,
  categories,
});

export default AppStore
