import { connect } from 'react-redux';
import React from 'react';
import Alerts from '../components/alerts';

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items,
    updateView: ownProps.updateView,
  };
};

export default connect(
  mapStateToProps,
)(Alerts);
