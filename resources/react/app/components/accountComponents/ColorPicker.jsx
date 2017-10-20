import React from 'react';
import { GithubPicker } from 'react-color';

const ColorPicker = (props) => {
  return (
    <GithubPicker onChnageComplete={props.updateColor}/>
  );
};

export default ColorPicker;
