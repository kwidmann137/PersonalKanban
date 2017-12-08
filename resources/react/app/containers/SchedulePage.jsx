import React from 'react';
import Schedule from 'Components/Schedule';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: state.items,
    categories: state.categories,
  }
};

export default connect(
  mapStateToProps
)(Schedule)
