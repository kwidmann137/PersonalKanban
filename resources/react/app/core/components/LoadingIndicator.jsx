import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const loader = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: '999999'
};

const loaderIcon = {
  position: 'relative',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

export default class LoadingIndicator extends React.Component{

  render(){
    return (
      <div id="loading" style={loader}>
        <RefreshIndicator
          size={50}
          left={70}
          top={0}
          loadingColor="#FF9800"
          status="loading"
          style={loaderIcon}
        />
      </div>
    );
  }

}
