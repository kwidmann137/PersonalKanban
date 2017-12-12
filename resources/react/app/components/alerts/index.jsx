import React from 'react';
import UnsortedItemsAlert from './UnsortedItemsAlert';

const Alerts = ({items, updateView}) => {
  return (
    <div>
      <UnsortedItemsAlert items={items} updateView={updateView}/>
    </div>
  )
};

export default Alerts;
