import { combineReducers } from 'redux';
import items from './items';
import categories from './categories';
import user from './user';
import stages from './stages';

const AppStore = combineReducers({
  user,
  items,
  categories,
  stages,
});

export default AppStore
