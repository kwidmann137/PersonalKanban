import React from 'react';
import Schedule from '../components/schedule/Schedule';
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
