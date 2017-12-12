import store from '../app/index';

export const getTodaysList = (items) => {

};

const setLatestPossibleStartDates = (items) => {
  const { categories } = store.getState();
  categories.forEach(category => {
    let items = items.filter(item => item.category_id === category.id);
    const hours = category.hours;
    
  });
};

const evaluateItems = items => {

};

export const ScheduleItem = (items) => {

};
