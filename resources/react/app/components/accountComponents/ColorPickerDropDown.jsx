import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import ColorPicker from "./ColorPicker";

const style = {
  height: 30,
  width: 30,
};

const menuStyle = {
  background: 'transparent',
  boxShadow: 'none'
};

const ColorPickerDropDown = ({color, updateColor}) => {
  console.log(updateColor);
  return (
    <DropDownMenu
      className="color-picker-dropdown"
      iconButton={<div/>}
      iconStyle={Object.assign({}, style, {backgroundColor: color})}
      menuStyle={menuStyle}
      value={color}
    >
      <ColorPicker onChange={() => updateColor()}/>
    </DropDownMenu>
  )
};

export default ColorPickerDropDown;
