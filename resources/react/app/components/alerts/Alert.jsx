import React from 'react';

const Alert = ({text, color='#faf5ab', action = () =>{}}) => {
  return (
    <div className="hover" style={getStyle(color)} onClick={action}>
      {text}
    </div>
  );
};

export default Alert;

function getStyle(color){
  return {
    padding: '5px 10px',
    backgroundColor: color,
    color: 'rgba(0,0,0,0.87)'
  }
}
