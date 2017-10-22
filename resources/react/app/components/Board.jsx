import React from 'react';

const boardStyle = {
  display: 'flex',
  color: '#777',
};

const Board = ({children}) => {
  return (
    <div style={boardStyle}>
      {children}
    </div>
  );
};

export default Board;
