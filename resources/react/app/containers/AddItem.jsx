import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
import LoaderBackground from '../components/core/LoaderBackground';
import { addItem, addItems } from '../actions/index';
import AddItemWizard from "../components/wizards/addItemWizard/index";

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
