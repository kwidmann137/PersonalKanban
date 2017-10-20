import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
import LoaderBackground from 'Components/LoaderBackground';
import EditableItem from 'Components/EditableItem';
import { addItem } from 'Actions/index';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleAddItem: () => ownProps.toggleAddItem(),
    addItem: (text, category, estimatedTime, dueDate) => dispatch(addItem(text, category, estimatedTime, dueDate))
  };
};

let AddItem = ({toggleAddItem, addItem}) => {
  return (
    <div>
      <LoaderBackground>
        <EditableItem addItem={addItem} toggleAddItem={toggleAddItem}/>
      </LoaderBackground>
    </div>
  )
};

AddItem.propTypes = {
  toggleAddItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired
};

AddItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItem);

export default AddItem;
