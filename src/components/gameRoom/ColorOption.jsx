import React from "react";
import "../css/style.css";
import "../css/styleColorMenu.css";
import manager from "../engine/Manager";

const ColorOption = props => {
  const color = props.color;
  const exit = props.onColorSelected;

  return (
    <div
      className="color-option button-UI"
      id={`${color}-color`}
      onClick={() => {
        colorSelected(color);
        exit();
      }}
    />
  );
};

function colorSelected(color) {
  manager.getActivePlayer().selectColor(color);
}

export default ColorOption;
