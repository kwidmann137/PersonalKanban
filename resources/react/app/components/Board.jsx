import React from 'react';

const boardStyle = {
  display: 'flex',
  color: '#777',
};

export default class Board extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={boardStyle}>
        {this.props.children}
      </div>
    );
  }
}
