import React from "react";
import "../css/style.css";
import "../css/styleColorMenu.css";
import ColorOption from "./ColorOption";

const ColorMenu = props => {
  const exit = props.onColorSelected;

  return (
    <div className={"menu-background"}>
      <div className={"menu-content"}>
        <h2>Choose color</h2>
        <div className={"color-panel"}>
          <ColorOption color="red" onColorSelected={exit} />
          <ColorOption color="yellow" onColorSelected={exit} />
          <ColorOption color="green" onColorSelected={exit} />
          <ColorOption color="blue" onColorSelected={exit} />
        </div>
      </div>
    </div>
  );
};

export default ColorMenu;
