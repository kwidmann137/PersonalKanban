import { combineReducers } from 'redux';
import items from './items';
import categories from './categories';
import user from './user';
import boardStages from './boardStages';
import sortingStages from './sortingStages';

const AppStore = combineReducers({
  user,
  items,
  categories,
  boardStages,
  sortingStages,
});

export default AppStore
