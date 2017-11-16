import React from 'react';

const iconStyle = {
  width: 40,
  height: 40
};

const NoItemsMessage = () => (
  <div className="text-center" style={{width: '100%', marginTop: 20}}>
    <h1>It looks like you do not have any items yet.
      <br/>Use the <img src="assets/AddItemIcon.png" alt="add item icon" style={iconStyle}/> icon to add your first item.</h1>
  </div>
);

export default NoItemsMessage;
