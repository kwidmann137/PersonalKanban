import Api from '../../helpers/Api';
import store from '../index';
import {saveCategories} from "../actions/index";

let initialCategories = [];

const categories = (state = initialCategories, action) => {

  let newState = [...state];

  switch(action.type){
    case "ADD_CATEGORY":
      return [
        ...state,
        {
          id: null,
          name: '',
          color: '#FAEE76',
          hours: [
            0, 0, 0, 0, 0, 0, 0
          ]
        }
      ];
    case 'SAVE_CATEGORIES':
      return action.categories;
    case 'UPDATE_CATEGORY_COLOR':
      newState[action.category].color = action.color;
      return newState;
    case 'UPDATE_CATEGORY_NAME':
      newState[action.category].name = action.name;
      return newState;
    case 'UPDATE_CATEGORY_HOURS':
      newState[action.category].hours = action.hours;
      return newState;
    default:
      return state;
  }
};

export default categories;

Api.get('/getCategories')
  .then(resp => {
    console.log(resp);
    store.dispatch(saveCategories(resp.data));
  })
  .catch(err => {
    console.log(err);
  });
