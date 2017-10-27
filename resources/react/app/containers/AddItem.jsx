import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
import LoaderBackground from 'Components/LoaderBackground';
import EditableStickyNote from 'Components/EditableStickyNote';
import { addItem } from 'Actions/index';

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    updateView: ownProps.updateView
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleAddItem: () => ownProps.toggleAddItem(),
    addItem: (text, category, estimatedTime, dueDate) => dispatch(addItem(text, category, estimatedTime, dueDate))
  };
};

let AddItem = ({toggleAddItem, addItem, categories, updateView}) => {
  return (
    <div>
      <LoaderBackground>
        <EditableStickyNote
          categories={categories}
          addItem={addItem}
          toggleAddItem={toggleAddItem}
          updateView={updateView}
        />
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
