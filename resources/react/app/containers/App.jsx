import { connect } from 'react-redux';
import React from 'react';
import App from '../components/App'
import { addItem } from 'Actions/index';

const mapStateToProps = state => {
  return {
    loading: state.loading,
  };
};

export default connect(
  mapStateToProps,
)(App);
