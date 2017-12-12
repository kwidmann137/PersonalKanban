import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
import LoaderBackground from 'Components/LoaderBackground';
import { addItem, addItems } from 'Actions/index';
import AddItemWizard from "../components/stickyNote/addItemWizard/index";

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    updateView: ownProps.updateView
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleAddItem: () => ownProps.toggleAddItem(),
    addItem: (item) => dispatch(addItem(item)),
    addItems: (items) => dispatch(addItems(items))
  };
};

let AddItem = ({toggleAddItem, addItem, addItems, categories, updateView}) => {
  return (
    <div>
      <LoaderBackground>
        <AddItemWizard
          updateView={updateView}
          toggleAddItem={toggleAddItem}
          categories={categories}
          addItem={addItem}
          addItems={addItems}
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
