import { store } from '../app/index';

export const getTodaysList = (items) => {

};

const setLatestPossibleStartDate = (items) => {

};

export const setEarliestPossibleStartDate = ( items ) => {
  const { categories } = store.getState();
  console.log(store.getState().items);
  const categoryHours = getCategoryHours(null, items);
  const sortedItems = sortItemsForScheduling(items);

  let returnItems = [...items];

  categories.forEach(category => {

    const catItems = sortedItems[category.id];
    const dueDates = Object.keys(catItems);
    dueDates.sort((prev, curr) => new Date(prev) > new Date(curr));

    dueDates.forEach(dueDate => {
      const timesToPerform = Object.keys(catItems[dueDate]);
      timesToPerform.sort((prev, curr) => curr > prev);

      let availableHours = categoryHours[category.id];
      let categoryDates = Object.keys(categoryHours[category.id]);
      timesToPerform.forEach(time => {
        let items = catItems[dueDate][time];
        items.forEach(item => {
          const hours = parseInt(item.estimated_time.split(":")[0]);
          const minutes = parseInt(item.estimated_time.split(":")[1]);
          const totalTime = hours + (minutes/60);
          for(let index in categoryDates){
            let date = categoryDates[index];
            if(availableHours[date] >= totalTime){
              availableHours[date] -= totalTime;
              let returnItem = returnItems.filter(thisItem => thisItem.id === item.id)[0];
              returnItem.start = new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
              returnItem.end = new Date(new Date().setHours(0,0,0,0));
              returnItem.end.setDate(returnItem.start.getDate() + 1);
              //ToDo: Also add in an attribute to set other days this could possibly fit
              break;
            }
          }
        });
      });
    });

  });
  console.log(store.getState().items);
  console.log(returnItems);
  return returnItems;
};

export const getWorstCaseCategoryHours = (item, items, category_id) => {
  const categoryHours = getCategoryHours(item, items);
  const sortedItems = sortItemsForScheduling(items);

  let returnItems = [...items];
  let availableHours = categoryHours[category_id];

  const catItems = sortedItems[category_id];
  const dueDates = Object.keys(catItems);
  dueDates.sort((prev, curr) => new Date(prev) < new Date(curr));

  console.log(catItems);

  dueDates.forEach(dueDate => {
    const timesToPerform = Object.keys(catItems[dueDate]);
    timesToPerform.sort((prev, curr) => curr > prev);

    let categoryDates = Object.keys(categoryHours[category_id]);
    timesToPerform.forEach(time => {
      let items = catItems[dueDate][time];
      items.forEach(item => {
        const hours = parseInt(item.estimated_time.split(":")[0]);
        const minutes = parseInt(item.estimated_time.split(":")[1]);
        const totalTime = hours + (minutes/60);

        for(let index in categoryDates){
          //traverse in reverse order to get latest possible start dates and maximize
          //changes of fitting the new item
          let date = categoryDates[categoryDates.length - 1 - index];
          if(availableHours[date] >= totalTime){
            availableHours[date] -= totalTime;
            break;
          }
        }
      });
    });
  });

  console.log(availableHours);

  if(item != null){
    Object.keys(availableHours).forEach(date => {
      if(new Date(new Date(date).getTime() + item.due_date.getTimezoneOffset() * 60 * 1000) > item.due_date){
        console.log("Delete available hours for " + date);
        delete availableHours[date];
      }
    });
  }

  console.log(availableHours);
  return availableHours;
};

export const getScheduledItems = (items) => {
  let itemsCopy = [...items];
  let itemsWithStartDate = setEarliestPossibleStartDate(itemsCopy);
  console.log(itemsWithStartDate);
  let todaysItems = itemsWithStartDate.filter(item => item.start.setHours(0,0,0,0) === new Date().setHours(0,0,0,0));
  console.log(todaysItems);
  todaysItems.forEach(item => {
    delete item.start;
    delete item.end;
  });
  return todaysItems;
};

export const sortItemsForScheduling = (origItems) => {
  const { categories } = store.getState();

  let items = [...origItems];

  let sortedItems = {};

  categories.forEach(category => {

    sortedItems[category.id] = {};
    let catItems = items.filter(item => item.category_id === category.id);

    if(catItems.length < 1) return;

    const uniqueDates = catItems.map(item => item.due_date).filter((val, index, self) => self.indexOf(val) === index);

    uniqueDates.forEach(date => {

      sortedItems[category.id][date] = {};
      let itemsWithDate = catItems.filter(item => item.due_date === date);
      const uniqueTimes = itemsWithDate.map(item => parseInt(item.estimated_time.split(":")[0])).filter((val, index, self) => self.indexOf(val) === index);

      uniqueTimes.forEach(hours => {
        let itemsWithSameTime = itemsWithDate.filter(item => parseInt(item.estimated_time.split(":")[0]) === hours);
        itemsWithSameTime.sort((prev, curr) => prev.sorting_stage < curr.sorting_stage);
        sortedItems[category.id][date][hours] = itemsWithSameTime;
      });
    });
  });

  return sortedItems;
};

export const getCategoryHours = (item, items) => {

  const { categories } = store.getState();

  let catHours = {};

  categories.forEach(category => {
    const catItems = items.filter(item => item.category_id === category.id);

    const currDate = new Date(new Date().setHours(0,0,0,0));
    let maxDate = new Date();
    if(catItems.length > 0){
      maxDate = catItems
        .map(item => new Date(new Date(item.due_date).getTime() + currDate.getTimezoneOffset() * 60 * 1000))
        .reduce((prev, curr) => prev < curr ? curr : prev);
    }
    if(item && item.category_id === category.id && maxDate < new Date(new Date(item.due_date).getTime() + currDate.getTimezoneOffset() * 60 * 1000)){
      maxDate = new Date(new Date(item.due_date).getTime() + currDate.getTimezoneOffset() * 60 * 1000);
    }

    let hours = {};
    for(let date = currDate; date <= maxDate; date.setDate(date.getDate() + 1)){
      hours[date.toISOString().slice(0,10)] = category.hours[date.getDay()];
    }

    catHours[category.id] = hours;
  });

  return catHours;
};
