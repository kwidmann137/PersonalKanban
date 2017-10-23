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

const anchorOrigin = {
  vertical: 'center',
  horizontal: 'left'
};

const ColorPickerDropDown = ({color, onChange}) => {
  return (
    <DropDownMenu
      className="color-picker-dropdown"
      iconButton={<div/>}
      iconStyle={Object.assign({}, style, {backgroundColor: color})}
      menuStyle={menuStyle}
      anchorOrigin={anchorOrigin}
      value={color}
    >
      <ColorPicker onChange={onChange}/>
    </DropDownMenu>
  )
};

export default ColorPickerDropDown;
