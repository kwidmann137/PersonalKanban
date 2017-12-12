import React from 'react';
import Alert from './Alert';

const UnsortedItemsAlert = ({items, updateView}) => {

  let unsortedItems = items.filter(item => item.sorting_stage === 0);

  if(unsortedItems.length > 0){
    return (
      <Alert
        text="You have unsorted items. Let's go sort them so we can better guide your tasks!."
        action={() => updateView('sortItems')}
      />
    );
  }

  return null;

};

export default UnsortedItemsAlert;
