import React from 'react';
import { GithubPicker } from 'react-color';

const style={
  border: 'none',
  boxShadow: 'none',
};

const ColorPicker = ({onChange}) => {
  return (
    <GithubPicker
      // triangle='hide'
      // style={style}
      onChange={onChange}/>
  );
};

export default ColorPicker;
