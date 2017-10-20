import { combineReducers } from 'redux';
import items from './items';
import activeView from './activeView';
import categories from './categories';
import user from './user';

const AppStore = combineReducers({
  user,
  items,
  activeView,
  categories,
});

export default AppStore
