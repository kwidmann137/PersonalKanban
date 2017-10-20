import { connect } from 'react-redux';
import React from 'react';
import LoaderBackground from 'Components/LoaderBackground';
import EditableItem from 'Components/EditableItem';

let AddItem = ({dispatch, toggleAddItem}) => {
  return (
    <div>
      <LoaderBackground>
        <EditableItem dispatch={dispatch} toggleAddItem={toggleAddItem}/>
      </LoaderBackground>
    </div>
  )
};

AddItem = connect()(AddItem);

export default AddItem;
