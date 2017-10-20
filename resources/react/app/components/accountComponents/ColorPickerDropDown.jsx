import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import ColorPicker from "./ColorPicker";


const ColorPickerDropDown = (props) => {
  return (
    <DropDownMenu value={props.color}>
      <ColorPicker updateColor={props.updateColor}/>
    </DropDownMenu>
  )
};

export default ColorPickerDropDown;
