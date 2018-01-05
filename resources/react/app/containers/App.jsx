import { connect } from 'react-redux';
import React from 'react';
import App from '../components/App'

const mapStateToProps = state => {
  return {
    loading: state.loading,
    alerts: state.alerts
  };
};

export default connect(
  mapStateToProps,
)(App);
