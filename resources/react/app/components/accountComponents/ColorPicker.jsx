import React from 'react';
import { GithubPicker } from 'react-color';

const ColorPicker = ({onChange}) => {
  return (
    <GithubPicker
      onChange={onChange}/>
  );
};

export default ColorPicker;
