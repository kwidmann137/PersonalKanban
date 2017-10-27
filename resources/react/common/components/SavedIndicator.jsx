import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

const loader = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: '999999'
};

const loaderIcon = {
  position: 'relative',
  width: 100,
  height: 100,
  zIndex: 2000,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

export default class SavedIndicator extends React.Component{

  render(){
    return (
      <div style={loader}>
        <CheckCircle style={loaderIcon} color="#33b440"/>
      </div>
    );
  }

}
