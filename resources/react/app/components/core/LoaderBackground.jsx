import React from 'react';

const loader = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: '1000'
};

export default class LoaderBackground extends React.Component{

  render(){
   return (
     <div style={loader}>
       {this.props.children}
     </div>
   )
  }
}
